using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Serilog;

namespace Mauritius.EInvoicing.Server.Controllers
{
    [ApiController]
    [Route("Party")]
    [Authorize]
    public class PartyController(IPartyService partyService) : ControllerBase
    {
        [HttpPost]
        [Route("AddBuyer")]

        public async Task<IActionResult> AddBuyer(Buyer buyer)
        {
            try
            {
                var result = partyService.AddBuyer(buyer);
                return Ok(result);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while adding buyer");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }


        [HttpPost]
        [Route("UpdateBuyer")]

        public async Task<IActionResult> UpdateBuyer(Buyer buyer,int buyerId)
        {
            try
            {
                var result = partyService.UpdateBuyer(buyer, buyerId);
                return Ok(result);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while adding buyer");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }

        [HttpGet]
        [Route("GetBuyer")]

        public async Task<ActionResult<Buyer>> GetBuyer(int buyerId)
        {
            try
            {
                var buyer = partyService.GetBuyer(buyerId);
                return Ok(buyer);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while getting buyer");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }

        [HttpGet]
        [Route("GetAllBuyers")]
        public async Task<ActionResult<IEnumerable<Buyer>>> GetBuyers()
        {
            try
            {
                var buyers = partyService.GetBuyers();
                return Ok(buyers);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while getting buyers");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }

        [HttpPost]
        [Route("AddSeller")]
        public async Task<IActionResult> AddSeller(Seller seller)
        {
            try
            {
                var result = partyService.AddSeller(seller);
                return Ok(result);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while adding seller");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }

        [HttpPost]
        [Route("UpdateSeller")]
        public async Task<IActionResult> UpdateSeller(Seller seller,int sellerId)
        {
            try
            {
                var result = partyService.UpdateSeller(seller, sellerId);
                return Ok(result);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while adding seller");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }

        [HttpGet]
        [Route("GetSeller")]
        public async Task<ActionResult<Seller>> GetSeller(int sellerId)
        {
            try
            {
                var seller = partyService.GetSeller(sellerId);
                return Ok(seller);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while getting seller");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }

        [HttpGet]
        [Route("GetAllSellers")]
        public async Task<ActionResult<IEnumerable<Seller>>> GetSellers()
        {
            try
            {
                var sellers = partyService.GetSellers();
                return Ok(sellers);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while getting sellers");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }
    }
}
