namespace Mauritius.EInvoicing.Server.Contracts;

public class Seller
{
    public string Name { get; set; }
    public string Address { get; set; }
    public string VatNumber { get; set; }
    public string BRN { get; set; }
    public string PhoneNo { get; set; }
    public int? Id { get; set; }
    public string? BankInfo { get; set; }
    public string? MailId { get; set; }

}