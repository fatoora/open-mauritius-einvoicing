namespace Mauritius.EInvoicing.Server.Contracts
{
    public class DeviceOnboardingRequest
    {

        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string EbsMraId { get; set; }
        public required string AreaCode { get; set; }
    }
}
