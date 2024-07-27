using Newtonsoft.Json;

namespace Mauritius.EInvoicing.Server.Contracts.MraContracts;

public class MRAInvoice
{
    [JsonProperty("invoiceCounter")] public string invoiceCounter { get; set; }
    [JsonProperty("transactionType")] public string transactionType { get; set; }
    [JsonProperty("personType")] public string personType { get; set; }
    [JsonProperty("invoiceTypeDesc")] public string invoiceTypeDesc { get; set; }
    [JsonProperty("currency")] public string currency { get; set; }
    [JsonProperty("invoiceIdentifier")] public string invoiceIdentifier { get; set; }
    [JsonProperty("invoiceRefIdentifier")] public string invoiceRefIdentifier { get; set; }
    [JsonProperty("previousNoteHash")] public string previousNoteHash { get; set; }
    [JsonProperty("reasonStated")] public string reasonStated { get; set; }
    [JsonProperty("totalVatAmount")] public string totalVatAmount { get; set; }
    [JsonProperty("totalAmtWoVatCur")] public string totalAmtWoVatCur { get; set; }
    [JsonProperty("totalAmtWoVatMur")] public string totalAmtWoVatMur { get; set; }
    [JsonProperty("totalAmtPaid")] public string totalAmtPaid { get; set; }
    [JsonProperty("dateTimeInvoiceIssued")] public string dateTimeInvoiceIssued { get; set; }
    [JsonProperty("itemList")] public List<ItemList> itemList { get; set; }
    [JsonProperty("salesTransactions")] public string salesTransactions { get; set; }
    [JsonProperty("buyer")] public BuyerTax buyer { get; set; }
    [JsonProperty("seller")] public SellerTax seller { get; set; }
    [JsonProperty("invoiceTotal")] public string invoiceTotal { get; set; }
}