namespace Mauritius.EInvoicing.Server.Contracts.MraContracts
{

    public class MRAInvoiceRequest
    {
        public string encryptedInvoice { get; set; }
        public string requestDateTime { get; set; }
        public string requestId { get; set; }
    }
}
