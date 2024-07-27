namespace Mauritius.EInvoicing.Server.Data.Entities
{
    public class Device
    {
        public Guid DeviceId { get; set; }
        public string DeviceName { get; set; }
        public string EbsMraId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string Key { get; set; }
        public DateTime ExpDateTime { get; set; }
        public string AreaCode { get; set; }
        public DateTime? UpdatedDateTime { get; set; }
    }
}
