using Mauritius.EInvoicing.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Serilog;

namespace Mauritius.EInvoicing.Server.Controllers
{
    [ApiController]
    [Route("Auth")]
    [AllowAnonymous]
    public class AuthController(IAuthService authService) : ControllerBase
    {


        [HttpPost]
        [Route("Login")]
        public IActionResult Login(string userName, string password)
        {
            try
            {
                var response = authService.Login(userName, password);
                return Ok(response);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while logging in");
                return BadRequest(e.Message);
            }
        }
    }
}
