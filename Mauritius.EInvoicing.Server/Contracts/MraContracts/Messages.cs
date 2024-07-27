using Newtonsoft.Json;

namespace Mauritius.EInvoicing.Server.Contracts.MraContracts;

public class Messages
{
    [JsonProperty("code")] public string code { get; set; }
    [JsonProperty("description")] public string description { get; set; }
}