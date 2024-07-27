using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mauritius.EInvoicing.Server.Data.Entities
{
    public class Seller
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SellerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string Brn { get; set; }
        public string VatNumber { get; set; }
        public string? BankInfo { get; set; }
        public string? MailId { get; set; }
    }
}
