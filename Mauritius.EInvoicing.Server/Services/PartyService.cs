using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Data;
using Mauritius.EInvoicing.Server.Data.Entities;
using System.Net;

namespace Mauritius.EInvoicing.Server.Services
{
    public interface IPartyService
    {
        int AddBuyer(Contracts.Buyer buyer);
        int UpdateBuyer(Contracts.Buyer buyer, int buyerId);
        Contracts.Buyer? GetBuyer(int buyerId);
        IEnumerable<Contracts.Buyer> GetBuyers();
        int AddSeller(Contracts.Seller seller);
        int UpdateSeller(Contracts.Seller seller, int sellerId);
        Contracts.Seller? GetSeller(int sellerId);
        IEnumerable<Contracts.Seller> GetSellers();
    }

    [RegisterPerRequest]

    public class PartyService(IBuyerRepository buyerRepository, ISellerRepository sellerRepository) : IPartyService
    {


        public int AddBuyer(Contracts.Buyer buyer)
        {
            if(buyer.VatType != "VATR")
            {
                buyer.VatNumber = "";
            }
            var buyerData = new Buyer()
            {
                Address = buyer.Address,
                Brn = buyer.BRN,
                Name = buyer.Name,
                PhoneNo = buyer.PhoneNo,
                VatNumber = buyer.VatNumber,
                BuyerReference = buyer.BuyerReference,
                VatType = buyer.VatType,
                MailId= buyer.MailId,
                ContactPerson= buyer.ContactPerson,
            };

            return buyerRepository.AddBuyer(buyerData);
        }

        public int UpdateBuyer(Contracts.Buyer buyer,int buyerId)
        {
            if (buyer.VatType != "VATR")
            {
                buyer.VatNumber = "";
            }
            var buyerData = new Buyer()
            {
                Address = buyer.Address,
                Brn = buyer.BRN,
                Name = buyer.Name,
                PhoneNo = buyer.PhoneNo,
                VatNumber = buyer.VatNumber,
                BuyerReference = buyer.BuyerReference,
                VatType= buyer.VatType,
                MailId= buyer.MailId,
                ContactPerson= buyer.ContactPerson,
            };

            return buyerRepository.UpdateBuyer(buyerData, buyerId);
        }

        public Contracts.Buyer? GetBuyer(int buyerId)
        {
            var buyer = buyerRepository.GetBuyer(buyerId);

            if (buyer == null)
            {
                return default;
            }

            return new Contracts.Buyer()
            {
                Address = buyer.Address,
                BRN = buyer.Brn,
                Name = buyer.Name,
                PhoneNo = buyer.PhoneNo,
                VatNumber = buyer.VatNumber,
                Id = buyer.BuyerId,
                BuyerReference= buyer.BuyerReference,
                VatType= buyer.VatType,
                ContactPerson = buyer.ContactPerson,
                MailId= buyer.MailId,
            };

        }

        public IEnumerable<Contracts.Buyer> GetBuyers()
        {
            var buyers = buyerRepository.GetBuyers().ToList();

            if (buyers.Count != 0)
            {
                return buyers.Select(x => new Contracts.Buyer()
                {
                    Address = x.Address,
                    BRN = x.Brn,
                    Name = x.Name,
                    PhoneNo = x.PhoneNo,
                    VatNumber = x.VatNumber,
                    Id = x.BuyerId,
                    BuyerReference= x.BuyerReference,
                    VatType= x.VatType,
                    MailId= x.MailId,
                    ContactPerson= x.ContactPerson,
                });
            }

            return [];
        }

        public int AddSeller(Contracts.Seller seller)
        {
            var sellerData = new Seller()
            {
                Address = seller.Address,
                Brn = seller.BRN,
                Name = seller.Name,
                VatNumber = seller.VatNumber,
                PhoneNo = seller.PhoneNo,
                BankInfo = seller.BankInfo,
                MailId= seller.MailId,
            };

            return sellerRepository.AddSeller(sellerData);
        }
        public int UpdateSeller(Contracts.Seller seller,int sellerId)
        {
            var sellerData = new Seller()
            {
                Address = seller.Address,
                Brn = seller.BRN,
                Name = seller.Name,
                VatNumber = seller.VatNumber,
                PhoneNo = seller.PhoneNo,
                BankInfo = seller.BankInfo,
                MailId= seller.MailId,
            };

            return sellerRepository.UpdateSeller(sellerData,sellerId);
        }
        public Contracts.Seller? GetSeller(int sellerId)
        {
            var seller = sellerRepository.GetSeller(sellerId);

            if (seller == null)
            {
                return default;
            }

            return new Contracts.Seller()
            {
                Address = seller.Address,
                BRN = seller.Brn,
                Name = seller.Name,
                PhoneNo = seller.PhoneNo,
                VatNumber = seller.VatNumber,
                Id = seller.SellerId,
                BankInfo= seller.BankInfo,
                MailId= seller.MailId,
            };

        }

        public IEnumerable<Contracts.Seller> GetSellers()
        {
            var sellers = sellerRepository.GetSellers().ToList();

            if (sellers.Count != 0)
            {
                return sellers.Select(x => new Contracts.Seller()
                {
                    Address = x.Address,
                    BRN = x.Brn,
                    Name = x.Name,
                    PhoneNo = x.PhoneNo,
                    VatNumber = x.VatNumber,
                    Id = x.SellerId,
                    BankInfo= x.BankInfo,
                    MailId= x.MailId,
                });
            }

            return [];

        }
    }
}
