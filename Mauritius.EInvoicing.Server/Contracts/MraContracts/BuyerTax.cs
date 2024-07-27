using Newtonsoft.Json;

namespace Mauritius.EInvoicing.Server.Contracts.MraContracts;

public class BuyerTax
{
    [JsonProperty("businessAddr")] public string businessAddr { get; set; }
    [JsonProperty("brn")] public string brn { get; set; }
    [JsonProperty("buyerType")] public string buyerType { get; set; }
    [JsonProperty("name")] public string name { get; set; }
    [JsonProperty("nic")] public string nic { get; set; }
    [JsonProperty("tan")] public string tan { get; set; }
}