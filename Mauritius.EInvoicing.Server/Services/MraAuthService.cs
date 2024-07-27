using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Contracts.MraContracts;
using Newtonsoft.Json;
using RestSharp;
using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace Mauritius.EInvoicing.Server.Services
{
    [RegisterSingleton]
    public class MraAuthService(IUrlProviderService urlProvider) : IMraAuthService
    {
        public async Task<MraAuthResponse> GenerateToken(DeviceOnboardingRequest request)
        {
            var aesAlgorithm = Aes.Create();
            aesAlgorithm.Mode = CipherMode.ECB;
            aesAlgorithm.Padding = PaddingMode.PKCS7;
            aesAlgorithm.KeySize = 256;
            aesAlgorithm.GenerateKey();


            var aesKey = Convert.ToBase64String(aesAlgorithm.Key);


            var authenticationPayload = new AuthenticationPayload
            {
                username = request.UserName,
                password = request.Password,
                encryptKey = aesKey,
                refreshToken = false
            };



            var publicKey = PublicKeyHelper.GetPublicKey();




            // Convert authentication paylod (JSON) and encrypt payload using MRA public key
            var encryptedPayload = publicKey.Encrypt(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(authenticationPayload)), RSAEncryptionPadding.Pkcs1);

            var authRequest = new AuthPayloadRequest()
            {
                requestId = Guid.NewGuid().ToString("N"),
                payLoad = Convert.ToBase64String(encryptedPayload)
            };




            var restClientAuth = GetRestClientForAuth(request, authRequest, out var requestAuth);


            var responseAuth = await restClientAuth.ExecuteAsync(requestAuth);

            if (responseAuth.StatusCode == HttpStatusCode.OK)
            {
                var mraResponse = JsonConvert.DeserializeObject<AuthenticationResponseMra>(responseAuth.Content);

                var mraKey = decryptKeyReceivedFromMRA(aesAlgorithm, mraResponse?.key);


                return new MraAuthResponse()
                {
                    requestId = mraResponse.requestId,
                    responseId = mraResponse.responseId,
                    status = mraResponse.status,
                    token = mraResponse.token,
                    key = mraKey,
                    encryptedKey = mraResponse.key,
                    expiryDate = mraResponse.expiryDate
                };

            }

            var errorResponse = JsonConvert.SerializeObject(responseAuth.Content);
            throw new Exception(errorResponse);


        }

        private RestClient GetRestClientForAuth(DeviceOnboardingRequest request, AuthPayloadRequest authRequest,
            out RestRequest requestAuth)
        {
            ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
            var authEndPoint = urlProvider.GetMraUrl().Base + urlProvider.GetMraUrl().Auth;
            var restClientAuth = new RestClient(authEndPoint);
            requestAuth = new RestRequest(authEndPoint, Method.Post);
            requestAuth.AddHeader("EbsMraId", request.EbsMraId);
            requestAuth.AddHeader("Content-Type", "application/json");
            requestAuth.AddHeader("username", request.UserName);
            requestAuth.AddParameter("application/json", JsonConvert.SerializeObject(authRequest),
                ParameterType.RequestBody);
            return restClientAuth;
        }

        private static string decryptKeyReceivedFromMRA(Aes aesAlgorithm, string mraEncryptedKey)
        {
            var decryptor = aesAlgorithm.CreateDecryptor();

            using var msDecrypt = new MemoryStream(Convert.FromBase64String(mraEncryptedKey));
            using var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read);
            using var srDecrypt = new StreamReader(csDecrypt);

            return srDecrypt.ReadToEnd();
        }



    }
}
