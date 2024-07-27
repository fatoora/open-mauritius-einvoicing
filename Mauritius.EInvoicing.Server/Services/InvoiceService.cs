using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Contracts.MraContracts;
using Mauritius.EInvoicing.Server.Data;
using Mauritius.EInvoicing.Server.Data.Entities;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using RestSharp;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Cryptography;

namespace Mauritius.EInvoicing.Server.Services
{
    [RegisterPerRequest]
    public class InvoiceService(IUrlProviderService urlProvider,
        IDeviceService deviceService,
        IInvoiceRepository invoiceRepository,
        IPartyService partyService,
        IHttpContextService httpContext) : IInvoiceService
    {
        public async Task<Invoice?> Submit(InvoiceRequest invoiceRequest)
        {

            var lastInvoice = invoiceRepository.GetLastInvoice(invoiceRequest.DeviceId);

            var invoices = MapToMraInvoice(invoiceRequest, lastInvoice);

            var device = await GetDeviceWithValidToken(invoiceRequest);



            var mraInvoiceRequest = GetMraInvoiceRequest(invoices, device);


            var responseInv = await TransmitInvoice(device, mraInvoiceRequest);



            if (responseInv.StatusCode != HttpStatusCode.OK)
            {
                throw new Exception(JsonConvert.SerializeObject(responseInv.Content));
            }

            var transmissionResponse = JsonConvert.DeserializeObject<TransmissionResponseMra>(responseInv.Content);

            if (transmissionResponse?.status != "SUCCESS")
            {
                throw new Exception(JsonConvert.SerializeObject(transmissionResponse));
            }

            var hashableInvoiceString = $"{invoices[0].dateTimeInvoiceIssued}{invoices[0].totalAmtPaid}{invoices[0].seller.brn}{invoices[0].invoiceIdentifier}";
            var hash = HashHelper.ComputeSha256Hash(hashableInvoiceString);
            var buyerData = partyService.GetBuyer(invoiceRequest.BuyerId) ?? throw new Exception("Buyer not found");
            var invoice = new Invoice
            {
                InvoiceId = new Guid(),
                InvoiceLineItems = JsonConvert.SerializeObject(invoiceRequest.LineItems, new StringEnumConverter()),
                QrCode = transmissionResponse.fiscalisedInvoices[0].qrCode,
                CreatedDateTime = DateTime.Now,
                Hash = hash,
                ICV = Convert.ToInt32(invoices[0].invoiceCounter),
                DeviceId = invoiceRequest.DeviceId,
                TotalAmount = invoiceRequest.InvoiceTotal,
                TotalAmountWithoutVat = invoiceRequest.TotalAmountWithoutVat,
                TotalVat = invoiceRequest.TotalVatAmount,
                Currency = invoiceRequest.Currency,
                InvoiceType = invoiceRequest.InvoiceType.ToString(),
                SellerId = invoiceRequest.SellerId,
                BuyerId = invoiceRequest.BuyerId,
                NoteReason = invoiceRequest.NoteReason,
                InvoiceReferenceNumber = invoiceRequest.InvoiceReferenceNumber,
                SalesOrderNo = invoiceRequest.SalesOrderNo,
                CommodityCode = invoiceRequest.CommodityCode,
                ModeOfShipment = invoiceRequest.ModeOfShipment,
                PortOfLoading = invoiceRequest.PortOfLoading,
                PortOfDischarge = invoiceRequest.PortOfDischarge,
                PaymentTerms = invoiceRequest.PaymentTerms,
                NetWeight = invoiceRequest.NetWeight,
                GrossWeight = invoiceRequest.GrossWeight,
                BuyerName = invoices[0].buyer.name,
                CreatedBy = httpContext.GetCurrentUserName(),
                FobCharge = invoiceRequest.FobCharge,
                FrightCharge = invoiceRequest.FrightCharge,
                InsuranceCharge = invoiceRequest.InsuranceCharge,
                DeliveryTerms= invoiceRequest.DeliveryTerms,
                NoOfPackage= invoiceRequest.NoOfPackage,
                TotalAmtWoVatMur=invoiceRequest.TotalAmtWoVatMur,
                InvoiceNumber = invoiceRequest.InvoiceNumber,
                PoNumber=invoiceRequest.PoNumber,
                IncoTerms= invoiceRequest.IncoTerms,
                ConversionRate=invoiceRequest.ConversionRate,
                BuyerAddress =buyerData.Address,
                BuyerPhoneNo=buyerData.PhoneNo,
                SystemInvoice=invoiceRequest.SystemInvoice
            };
            invoiceRepository.AddInvoice(invoice);
            return invoice;
        }

        public MRAInvoiceRequest GetMraInvoiceRequest(List<MRAInvoice> invoices, Device device)
        {
            var aesAlgorithm = Aes.Create();
            aesAlgorithm.Mode = CipherMode.ECB;
            aesAlgorithm.Padding = PaddingMode.PKCS7;
            aesAlgorithm.KeySize = 256;
            aesAlgorithm.GenerateKey();


            var encryptedInvoice = EncryptInvoice(aesAlgorithm, invoices, device.Key);

            var mraInvoiceRequest = GenerateInvoiceSubmissionPayload(encryptedInvoice);
            return mraInvoiceRequest;
        }

        private async Task<Device> GetDeviceWithValidToken(InvoiceRequest invoiceRequest)
        {
            var device = deviceService.GetDeviceById(invoiceRequest.DeviceId) ?? throw new Exception("Device not found");
            // Secret key used to sign the JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(device.Token);
            var expDateTimeUtc = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "exp");
            var deviceExpDateTime = utcToDateTime(int.Parse(expDateTimeUtc.Value));
            if (deviceExpDateTime <= DateTime.Now)
            {
                return await deviceService.RenewToken(device.DeviceId);
            }
            return device;
        }
        private DateTime utcToDateTime(int utcTime)
        {
            int unixTimeStamp = utcTime;
            // Create a DateTime value starting from January 1, 1970
            DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            // Add the number of seconds in Unix timestamp to the epoch
            DateTime date = epoch.AddSeconds(unixTimeStamp);

            // Format the date to the specified format with milliseconds
            string formattedDate = date.ToString("yyyy-MM-dd HH:mm:ss.fffffff");

            Console.WriteLine("Formatted UTC DateTime: " + formattedDate);

            // To convert to local time and then format
            DateTime localDate = date.ToLocalTime();
            //string formattedLocalDate = localDate.ToString("yyyy-MM-dd HH:mm:ss.fffffff");
            return localDate;
        }

        public async Task<RestResponse> TransmitInvoice(Device device, MRAInvoiceRequest mraInvoiceRequest)
        {
            var invoiceSubmittingUrl = urlProvider.GetMraUrl().Base + urlProvider.GetMraUrl().Transmission;
            ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
            var restClientInv = new RestClient(invoiceSubmittingUrl);
            var requestInv = new RestRequest(invoiceSubmittingUrl, Method.Post);
            requestInv.AddHeader("Content-Type", "application/json");
            requestInv.AddHeader("username", device.UserName);
            requestInv.AddHeader("EbsMraId", device.EbsMraId);
            requestInv.AddHeader("areaCode", device.AreaCode);
            requestInv.AddHeader("token", device.Token);
            requestInv.AddParameter("application/json", JsonConvert.SerializeObject(mraInvoiceRequest),
                ParameterType.RequestBody);

            var response = await restClientInv.ExecuteAsync(requestInv);

            return response;

        }

        public List<MRAInvoice> MapToMraInvoice(InvoiceRequest invoiceRequest, Invoice? lastInvoice)
        {


            var lineItems = new List<ItemList>();
            var itemCount = 1;
            foreach (var item in invoiceRequest.LineItems)
            {
                lineItems.Add(new ItemList
                {
                    itemNo = itemCount.ToString(),
                    taxCode = item.TaxCode.ToString(),
                    nature = item.Nature.ToString(),
                    itemDesc = item.Name,
                    quantity = item.Quantity.ToString(),
                    unitPrice = item.UnitPrice.ToString(CultureInfo.InvariantCulture),
                    amtWoVatCur = item.TotalAmountWithoutVat.ToString(CultureInfo.InvariantCulture),
                    amtWoVatMur = item.TotalAmountWithoutVat.ToString(CultureInfo.InvariantCulture),
                    vatAmt = item.VatAmount.ToString(CultureInfo.InvariantCulture),
                    totalPrice = item.TotalAmount.ToString(CultureInfo.InvariantCulture)
                });
                itemCount++;
            }

            var sellerData = partyService.GetSeller(invoiceRequest.SellerId) ??
                             throw new Exception("Seller not found");

            var seller = new SellerTax()
            {
                brn = sellerData.BRN,
                businessAddr = sellerData.Address,
                tan = sellerData.VatNumber,
                name = sellerData.Name
            };

            var buyerData = partyService.GetBuyer(invoiceRequest.BuyerId) ??
                            throw new Exception("Buyer not found");

            var buyer = new BuyerTax()
            {
                brn = buyerData.BRN,
                businessAddr = buyerData.Address,
                name = buyerData.Name
            };

            
                buyer.tan = buyerData.VatNumber;
                buyer.buyerType = buyerData.VatType;
            

            var invoice = new MRAInvoice()
            {
                invoiceCounter = lastInvoice == null ? "1" : (lastInvoice.ICV + 1).ToString(),
                transactionType = "B2B",
                personType = "VATR",
                invoiceTypeDesc = GetInvoiceTypeDesc(invoiceRequest.InvoiceType),
                currency = invoiceRequest.Currency,
                invoiceIdentifier = invoiceRequest.InvoiceNumber,
                invoiceRefIdentifier = invoiceRequest.InvoiceReferenceNumber ?? "",
                previousNoteHash = lastInvoice == null ? "0" : lastInvoice.Hash,
                reasonStated = invoiceRequest.NoteReason ?? "",
                totalVatAmount = invoiceRequest.TotalVatAmount.ToString(CultureInfo.InvariantCulture),
                totalAmtWoVatCur = invoiceRequest.TotalAmountWithoutVat.ToString(CultureInfo.InvariantCulture),
                totalAmtWoVatMur = invoiceRequest.TotalAmtWoVatMur.ToString(CultureInfo.InvariantCulture),
                totalAmtPaid = invoiceRequest.TotalAmountPaid.ToString(CultureInfo.InvariantCulture),
                invoiceTotal = invoiceRequest.InvoiceTotal.ToString(CultureInfo.InvariantCulture),
                dateTimeInvoiceIssued = DateTime.Now.ToString("yyyyMMdd HH:mm:ss"),
                seller = seller,
                buyer = buyer,
                itemList = lineItems,
                salesTransactions = "CASH"
            };


            return [invoice];

        }

        private static string GetInvoiceTypeDesc(InvoiceType invoiceType)
        {
            return invoiceType switch
            {
                InvoiceType.INVOICE => "STD",
                InvoiceType.CREDIT_NOTE => "CRN",
                InvoiceType.DEBIT_NOTE => "DRN",
                _ => throw new Exception("Invalid invoice type")
            };
        }


        private static string EncryptInvoice(Aes aes, object obj, string key)
        {
            using var aesAlgorithm = Aes.Create();
            aesAlgorithm.Key = Convert.FromBase64String(key);
            aesAlgorithm.Padding = aes.Padding;
            aesAlgorithm.Mode = aes.Mode;
            var encryptor = aesAlgorithm.CreateEncryptor();
            byte[] encryptedData;

            using (var ms = new MemoryStream())
            {
                using var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write);
                using (var sw = new StreamWriter(cs))
                {
                    sw.Write(JsonConvert.SerializeObject(obj));
                }

                encryptedData = ms.ToArray();
            }

            return Convert.ToBase64String(encryptedData);
        }

        private static MRAInvoiceRequest GenerateInvoiceSubmissionPayload(string encryptedInvoice)
        {
            var resultInvoice = new MRAInvoiceRequest
            {
                requestId = Guid.NewGuid().ToString(),
                requestDateTime = DateTime.Now.ToString("yyyyMMdd HH:mm:ss"),
                encryptedInvoice = encryptedInvoice
            };
            return resultInvoice;
        }

        public IEnumerable<Invoice> GetInvoices(Guid deviceId, int page, int pageSize, DateTime startDate, DateTime endDate)
        {
            return invoiceRepository.GetInvoices(deviceId, page, pageSize, startDate, endDate);
        }

        public Invoice GetInvoice(Guid invoiceId)
        {
            return invoiceRepository.GetInvoiceById(invoiceId) ?? throw new Exception("Invoice not found");
        }
    }
}
