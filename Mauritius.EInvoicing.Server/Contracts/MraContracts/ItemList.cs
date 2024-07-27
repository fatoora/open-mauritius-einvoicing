using Newtonsoft.Json;

namespace Mauritius.EInvoicing.Server.Contracts.MraContracts;

public class ItemList
{
    [JsonProperty("itemNo")] public string itemNo { get; set; }
    [JsonProperty("taxCode")] public string taxCode { get; set; }
    [JsonProperty("nature")] public string nature { get; set; }
    [JsonProperty("productCodeMra")] public string productCodeMra { get; set; }
    [JsonProperty("productCodeOwn")] public string productCodeOwn { get; set; }
    [JsonProperty("itemDesc")] public string itemDesc { get; set; }
    [JsonProperty("quantity")] public string quantity { get; set; }
    [JsonProperty("unitPrice")] public string unitPrice { get; set; }
    [JsonProperty("discount")] public string discount { get; set; }
    [JsonProperty("discountedValue")] public string discountedValue { get; set; }
    [JsonProperty("amtWoVatCur")] public string amtWoVatCur { get; set; }
    [JsonProperty("amtWoVatMur")] public string amtWoVatMur { get; set; }
    [JsonProperty("vatAmt")] public string vatAmt { get; set; }
    [JsonProperty("totalPrice")] public string totalPrice { get; set; }
}