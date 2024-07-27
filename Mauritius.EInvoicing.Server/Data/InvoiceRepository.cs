using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Data.Entities;

namespace Mauritius.EInvoicing.Server.Data
{
    public interface IInvoiceRepository
    {
        void AddInvoice(Invoice invoice);
        Invoice? GetLastInvoice(Guid deviceId);
        IEnumerable<Invoice> GetInvoices(Guid deviceId, int page, int pageSize, DateTime startDate, DateTime endDate);
        Invoice? GetInvoiceById(Guid invoiceId);
    }
    [RegisterPerRequest]
    public class InvoiceRepository(Repository repository) : IInvoiceRepository
    {
        public void AddInvoice(Invoice invoice)
        {
            repository.Invoices.Add(invoice);
            repository.SaveChanges();
        }

        public Invoice? GetLastInvoice(Guid deviceId)
        {
            return repository.Invoices.Where(i => i.DeviceId == deviceId)
                .OrderByDescending(i => i.CreatedDateTime).FirstOrDefault();
        }

        // get all invoices with pagination
        public IEnumerable<Invoice> GetInvoices(Guid deviceId, int page, int pageSize, DateTime startDate, DateTime endDate)
        {
            return repository.Invoices.Where(i => i.DeviceId == deviceId && i.CreatedDateTime >= startDate && i.CreatedDateTime <= endDate)
                .OrderByDescending(i => i.CreatedDateTime)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public Invoice? GetInvoiceById(Guid invoiceId)
        {
            return repository.Invoices.FirstOrDefault(i => i.InvoiceId == invoiceId);
        }
    }
}
