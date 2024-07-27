using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Contracts.MraContracts;
using Mauritius.EInvoicing.Server.Data.Entities;
using RestSharp;

namespace Mauritius.EInvoicing.Server.Services;

public interface IInvoiceService
{
    Task<Invoice?> Submit(InvoiceRequest invoiceRequest);

    IEnumerable<Invoice> GetInvoices(Guid deviceId, int page, int pageSize, DateTime startDate, DateTime endDate);

    List<MRAInvoice> MapToMraInvoice(InvoiceRequest invoiceRequest, Invoice? lastInvoice);

    MRAInvoiceRequest GetMraInvoiceRequest(List<MRAInvoice> invoices, Device device);
    Task<RestResponse> TransmitInvoice(Device device, MRAInvoiceRequest mraInvoiceRequest);

    Invoice GetInvoice(Guid invoiceId);
}