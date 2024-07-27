using Newtonsoft.Json;

namespace Mauritius.EInvoicing.Server.Contracts.MraContracts;

public class AuthPayloadRequest
{
    [JsonProperty("requestId")] public string requestId { get; set; }
    [JsonProperty("payload")] public string payLoad { get; set; }
}