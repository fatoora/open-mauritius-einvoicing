namespace Mauritius.EInvoicing.Server;

public class DeviceResponse
{
        public required string EbsMraId { get; set; }
        public required string AreaCode { get; set; }
        public required Guid DeviceId { get; set; }
}
