using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Data.Entities;
using System.Net;

namespace Mauritius.EInvoicing.Server.Data
{
    public interface ISellerRepository
    {
        int AddSeller(Seller seller);
        int UpdateSeller(Seller seller,int sellerId);
        Seller? GetSeller(int sellerId);
        IEnumerable<Seller> GetSellers();
    }

    [RegisterPerRequest]
    public class SellerRepository(Repository repository) : ISellerRepository
    {
        public int AddSeller(Seller seller)
        {
            repository.Sellers.Add(seller);
            repository.SaveChanges();
            return seller.SellerId;
        }
        public int UpdateSeller(Seller seller,int sellerId)
        {
            var sellerData=repository.Sellers.FirstOrDefault(x=>x.SellerId==sellerId);
            sellerData.Address=seller.Address;
            sellerData.Brn=seller.Brn;
            sellerData.Name=seller.Name;
            sellerData.VatNumber=seller.VatNumber;
            sellerData.PhoneNo=seller.PhoneNo;
            sellerData.BankInfo=seller.BankInfo;
            sellerData.MailId=seller.MailId;
            repository.SaveChanges();
            return sellerData.SellerId;
        }
        public Seller? GetSeller(int sellerId)
        {
            return repository.Sellers.FirstOrDefault(x => x.SellerId == sellerId);
        }

        public IEnumerable<Seller> GetSellers()
        {
            return repository.Sellers.ToList();
        }
    }
}
