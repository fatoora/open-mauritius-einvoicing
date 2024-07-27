using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Serilog;

namespace Mauritius.EInvoicing.Server.Controllers
{
    [ApiController]
    [Route("User")]
    public class UserController(IUserService userService) : ControllerBase
    {

        [HttpPost]
        [Route("Add")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Add(UserAddRequest user)
        {
            try
            {
                userService.AddUser(user);
                return Ok();
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while adding user");
                return BadRequest(JsonConvert.SerializeObject(e));
            }

        }

        [HttpPost]
        [Route("UpdatePassword")]
        [Authorize]
        public async Task<IActionResult> UpdatePassword(string currentPassword, string newPassword)
        {
            try
            {
                userService.UpdatePassword(currentPassword, newPassword);
                return Ok();
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while updating password");
                return BadRequest(e.Message);
            }

        }

    }
}
