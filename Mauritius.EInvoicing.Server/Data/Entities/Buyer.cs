using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mauritius.EInvoicing.Server.Data.Entities
{
    public class Buyer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BuyerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string Brn { get; set; }
        public string? VatNumber { get; set; }
        public string? BuyerReference { get; set; }
        public string? VatType { get; set; }
        public string? MailId { get; set; }
        public string? ContactPerson { get; set; }
    }
}
