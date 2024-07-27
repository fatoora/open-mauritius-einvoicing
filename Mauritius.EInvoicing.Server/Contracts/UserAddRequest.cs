namespace Mauritius.EInvoicing.Server.Contracts
{
    public class UserAddRequest
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public string? Email { get; set; }
        public required string DisplayName { get; set; }
        public bool IsAdmin { get; set; }
    }
}
