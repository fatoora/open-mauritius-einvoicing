namespace Mauritius.EInvoicing.Server.Contracts;

public class Buyer
{
    public int? Id { get; set; }
    public string Name { get; set; }
    public string? BuyerReference { get; set; }
    public string Address { get; set; }
    public string? VatNumber { get; set; }
    public string BRN { get; set; }
    public string? PhoneNo { get; set; }
    public string? VatType { get; set; }
    public string? MailId { get; set; }
    public string? ContactPerson { get; set; }
}