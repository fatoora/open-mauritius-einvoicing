using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Data.Entities;
using Mauritius.EInvoicing.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Serilog;

namespace Mauritius.EInvoicing.Server.Controllers
{
    [ApiController]
    [Route("InvoiceRequest")]
    [Authorize]
    public class InvoiceController(IInvoiceService invoiceService) : ControllerBase
    {

        [HttpPost]
        [Route("Submit")]
        public async Task<ActionResult<Invoice>> Submit(InvoiceRequest invoice)
        {
            try
            {
                var result = await invoiceService.Submit(invoice);
                return Ok(result);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while sending invoice");
                return BadRequest(JsonConvert.SerializeObject(e));
            }

        }

        [HttpGet]
        [Route("GetInvoices")]
        public IActionResult GetInvoices(Guid deviceId, int page, int pageSize, DateTime startDate, DateTime endDate)
        {
            try
            {
                var invoices = invoiceService.GetInvoices(deviceId, page, pageSize, startDate, endDate);
                return Ok(invoices);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while getting invoices");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }

        [HttpGet]
        [Route("GetInvoice")]
        public IActionResult GetInvoice(Guid invoiceId)
        {
            try
            {
                var invoices = invoiceService.GetInvoice(invoiceId);
                return Ok(invoices);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while getting invoices");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }
    }
}
