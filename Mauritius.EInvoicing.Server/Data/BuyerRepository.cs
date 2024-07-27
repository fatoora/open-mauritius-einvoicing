using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Data.Entities;
using System.Net;

namespace Mauritius.EInvoicing.Server.Data
{
    public interface IBuyerRepository
    {
        int AddBuyer(Buyer buyer);
        int UpdateBuyer(Buyer buyer, int buyerId);
        Buyer? GetBuyer(int buyerId);
        IEnumerable<Buyer> GetBuyers();
    }

    [RegisterPerRequest]
    public class BuyerRepository(Repository repository) : IBuyerRepository
    {
        public int AddBuyer(Buyer buyer)
        {
            repository.Buyers.Add(buyer);
            repository.SaveChanges();
            return buyer.BuyerId;
        }
        public int UpdateBuyer(Buyer buyer,int buyerId)
        {
            var buyerData=repository.Buyers.FirstOrDefault(x=>x.BuyerId==buyerId);
                buyerData.Address=buyer.Address;
                buyerData.Brn=buyer.Brn;
                buyerData.Name=buyer.Name;
                buyerData.PhoneNo=buyer.PhoneNo;
                buyerData.VatNumber=buyer.VatNumber;
                buyerData.BuyerReference=buyer.BuyerReference;
                buyerData.VatType=buyer.VatType;
                buyerData.MailId=buyer.MailId;
                buyerData.ContactPerson=buyer.ContactPerson;
                repository.SaveChanges();
            return buyerData.BuyerId;
        }
        public Buyer? GetBuyer(int buyerId)
        {
            return repository.Buyers.FirstOrDefault(x => x.BuyerId == buyerId);
        }

        public IEnumerable<Buyer> GetBuyers()
        {
            return repository.Buyers.ToList();
        }
    }
}
