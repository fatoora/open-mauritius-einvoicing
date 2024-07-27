using Newtonsoft.Json;

namespace Mauritius.EInvoicing.Server.Contracts.MraContracts;

public class AuthenticationPayload
{
    [JsonProperty("username")] public string username { get; set; }
    [JsonProperty("password")] public string password { get; set; }
    [JsonProperty("encryptKey")] public string encryptKey { get; set; }
    [JsonProperty("refreshToken")] public bool refreshToken { get; set; }
}