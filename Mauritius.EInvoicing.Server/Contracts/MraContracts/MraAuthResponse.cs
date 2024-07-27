namespace Mauritius.EInvoicing.Server.Contracts.MraContracts
{
    public class MraAuthResponse
    {
        public string responseId { get; set; }
        public string requestId { get; set; }
        public string status { get; set; }
        public string token { get; set; }
        public string key { get; set; }
        public string encryptedKey { get; set; }
        public string expiryDate { get; set; }
    }
}
