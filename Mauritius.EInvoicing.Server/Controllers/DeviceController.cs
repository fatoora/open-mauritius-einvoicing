using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Serilog;

namespace Mauritius.EInvoicing.Server.Controllers
{

    [ApiController]
    [Route("Device")]
    public class DeviceController(IDeviceService deviceService,ITestDriveService testDriveService) : ControllerBase
    {

        [HttpPost]
        [Route("OnBoard")]

        public async Task<IActionResult> OnBoard(DeviceOnboardingRequest request)
        {
            try
            {
                await deviceService.OnBoardDevice(request);
                return Ok();
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while onboarding");
                return BadRequest(JsonConvert.SerializeObject(e));
            }

        }

        [HttpPost]
        [Route("Get")]
        [Authorize]
        public IActionResult Get(Guid deviceGuid)
        {
            try
            {
                var response = deviceService.GetDeviceById(deviceGuid);
                var deviceResponse = new DeviceResponse()
                {
                    DeviceId = response.DeviceId,
                    AreaCode = response.AreaCode,
                    EbsMraId = response.EbsMraId
                };
                return Ok(deviceResponse);
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while logging in");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }


        [HttpPost]
        [Route("TestDrive")]

        public async Task<IActionResult> TestDrive(Guid deviceId)
        {
            try
            {
                await testDriveService.PerformTestDrive(deviceId);
                return Ok();
            }
            catch (Exception e)
            {
                Log.Error(e, "Error while logging in");
                return BadRequest(JsonConvert.SerializeObject(e));
            }
        }
    }
}
