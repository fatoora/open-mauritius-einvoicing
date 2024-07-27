namespace Mauritius.EInvoicing.Server.Data.Entities
{
    public class Invoice
    {
        public Guid InvoiceId { get; set; }
        public string Hash { get; set; }
        public int ICV { get; set; }
        public string InvoiceLineItems { get; set; }

        public string QrCode { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public string CreatedBy { get; set; }

        public Guid DeviceId { get; set; }

        public decimal TotalAmount { get; set; }
        public decimal TotalAmountWithoutVat { get; set; }
        public decimal TotalVat { get; set; }
        public string Currency { get; set; }
        public string InvoiceType { get; set; }

        public int SellerId { get; set; }
        public int BuyerId { get; set; }
        public string? NoteReason { get; set; }
        public string? InvoiceReferenceNumber { get; set; }
        public string? InvoiceNumber { get; set; }

        public string? SalesOrderNo { get; set; }
        public string? CommodityCode { get; set; }
        public string? ModeOfShipment { get; set; }
        public string? PortOfLoading { get; set; }
        public string? PortOfDischarge { get; set; }
        public string? PaymentTerms { get; set; }
        public string? NetWeight { get; set; }
        public string? GrossWeight { get; set; }
        public string BuyerName { get; set; }
        public decimal? FobCharge { get; set; }
        public decimal? FrightCharge { get; set; }
        public decimal? InsuranceCharge { get; set; }
        public string? DeliveryTerms { get; set; }
        public string? NoOfPackage { get; set; }
        public decimal TotalAmtWoVatMur { get; set; }
        public string? PoNumber { get; set; }
        public string? SystemInvoice { get; set; }
        public string? IncoTerms { get; set; }
        public string? BuyerAddress { get; set; }

        public string? BuyerPhoneNo { get; set; }

        public decimal? ConversionRate {  get; set; }
    }
}
