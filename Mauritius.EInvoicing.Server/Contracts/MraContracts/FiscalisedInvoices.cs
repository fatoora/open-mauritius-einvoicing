using Newtonsoft.Json;

namespace Mauritius.EInvoicing.Server.Contracts.MraContracts
{
    public class FiscalisedInvoices
    {
        [JsonProperty("invoiceIdentifier")] public string invoiceIdentifier { get; set; }
        [JsonProperty("irn")] public string irn { get; set; }
        [JsonProperty("qrCode")] public string qrCode { get; set; }
        [JsonProperty("status")] public string status { get; set; }
        [JsonProperty("warningMessages")] public List<Messages> warningMessages { get; set; }
        [JsonProperty("errorMessages")] public List<Messages> errorMessages { get; set; }
        [JsonProperty("infoMessages")] public List<Messages> infoMessages { get; set; }
    }
}
