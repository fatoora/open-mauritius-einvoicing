namespace Mauritius.EInvoicing.Server.Contracts
{
    public class InvoiceRequest
    {
        public Guid DeviceId { get; set; }
        public string Currency { get; set; }
        public string InvoiceNumber { get; set; }
        public decimal TotalVatAmount { get; set; }
        public decimal TotalAmountWithoutVat { get; set; }
        public decimal TotalAmountPaid { get; set; }
        public decimal InvoiceTotal { get; set; }

        public int SellerId { get; set; }
        public int BuyerId { get; set; }

        public List<LineItem> LineItems { get; set; }

        public string? NoteReason { get; set; }
        public string? InvoiceReferenceNumber { get; set; }

        public InvoiceType InvoiceType { get; set; }

        public string? SalesOrderNo { get; set; }
        public string? CommodityCode { get; set; }
        public string? ModeOfShipment { get; set; }
        public string? PortOfLoading { get; set; }
        public string? PortOfDischarge { get; set; }
        public string? PaymentTerms { get; set; }
        public string? NetWeight { get; set; }
        public string? GrossWeight { get; set; }
        public decimal? FobCharge { get; set; }
        public decimal? FrightCharge { get; set; }
        public decimal? InsuranceCharge { get; set; }
        public string? DeliveryTerms { get; set; }
        public string? NoOfPackage { get; set; }
        public decimal TotalAmtWoVatMur { get; set; }
        public string? PoNumber { get; set; }
        public string? IncoTerms { get; set; }
        public decimal? ConversionRate { get; set; }
        public string? SystemInvoice { get; set; }

    }

    public class LineItem
    {
        public string Name { get; set; }
        public TaxCode TaxCode { get; set; }
        public decimal Quantity { get; set; }
        public ItemTaxNature Nature { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalAmountWithoutVat { get; set; }
        public decimal VatAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public string Unit { get; set; }
    }
}
