using Newtonsoft.Json;

namespace Mauritius.EInvoicing.Server.Contracts.MraContracts;

public class AuthenticationResponseMra
{
    [JsonProperty("responseId")] public string responseId { get; set; }
    [JsonProperty("requestId")] public string requestId { get; set; }
    [JsonProperty("status")] public string status { get; set; }
    [JsonProperty("token")] public string token { get; set; }
    [JsonProperty("key")] public string key { get; set; }
    [JsonProperty("expiryDate")] public string expiryDate { get; set; }

}