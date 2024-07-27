using Newtonsoft.Json;

namespace Mauritius.EInvoicing.Server.Contracts.MraContracts;

public class SellerTax
{
    [JsonProperty("businessAddr")] public string businessAddr { get; set; }
    [JsonProperty("brn")] public string brn { get; set; }
    [JsonProperty("businessPhoneNo")] public string businessPhoneNo { get; set; }
    [JsonProperty("ebsCounterNo")] public string ebsCounterNo { get; set; }
    [JsonProperty("name")] public string name { get; set; }
    [JsonProperty("tan")] public string tan { get; set; }
    [JsonProperty("tradeName")] public string tradeName { get; set; }
}