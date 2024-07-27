using Newtonsoft.Json;

namespace Mauritius.EInvoicing.Server.Contracts.MraContracts
{
    public class TransmissionResponseMra
    {
        [JsonProperty("responseId")] public string responseId { get; set; }
        [JsonProperty("responseDateTime")] public string responseDateTime { get; set; }
        [JsonProperty("requestId")] public string requestId { get; set; }
        [JsonProperty("status")] public string status { get; set; }
        [JsonProperty("environment")] public string environment { get; set; }
        [JsonProperty("infoMessages")] public List<Messages> infoMessages { get; set; }
        [JsonProperty("errorMessages")] public List<Messages> errorMessages { get; set; }
        [JsonProperty("fiscalisedInvoices")] public List<FiscalisedInvoices> fiscalisedInvoices { get; set; }
    }
}
