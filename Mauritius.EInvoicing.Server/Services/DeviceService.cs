using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Data;
using Mauritius.EInvoicing.Server.Data.Entities;
using Newtonsoft.Json;
using Serilog;
using System.Globalization;

namespace Mauritius.EInvoicing.Server.Services
{
    [RegisterPerRequest]
    public class DeviceService(IMraAuthService mraAuthService,
        IDeviceRepository deviceRepository) : IDeviceService
    {

        public async Task OnBoardDevice(DeviceOnboardingRequest request)
        {

            Log.Information($"trying to onboard device {request.EbsMraId} , with payload {JsonConvert.SerializeObject(request)} ");
            CheckIfDeviceAlreadyOnboarded(request);


            var authResponse = await mraAuthService.GenerateToken(request);

            Log.Information($"onboarded device {request.EbsMraId} , with response {JsonConvert.SerializeObject(authResponse)} ");
            DateTime.TryParseExact(authResponse.expiryDate, "yyyyMMdd HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var dateTime);

            var device = new Device
            {
                DeviceId = new Guid(),
                DeviceName = request.EbsMraId,
                EbsMraId = request.EbsMraId,
                Token = authResponse.token,
                Key = authResponse.key,
                ExpDateTime = dateTime,
                UserName = request.UserName,
                Password = request.Password,
                AreaCode = request.AreaCode,
                UpdatedDateTime = null
            };
            deviceRepository.Add(device);

            Log.Information($"saved device {request.EbsMraId} ");
        }




        public async Task<Device> RenewToken(Guid deviceId)
        {
            var device = deviceRepository.GetDeviceById(deviceId);

            Log.Information($"renew token for  device {deviceId} Initiated ");

            var authResponse = await mraAuthService.GenerateToken(new DeviceOnboardingRequest
            {
                EbsMraId = device.EbsMraId,
                UserName = device.UserName,
                Password = device.Password,
                AreaCode = device.AreaCode
            });

            Log.Information($"renew token for  device {deviceId} responded with {JsonConvert.SerializeObject(authResponse)} ");

            DateTime.TryParseExact(authResponse.expiryDate, "yyyyMMdd HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var dateTime);

            device.Token = authResponse.token;
            device.Key = authResponse.key;
            device.ExpDateTime = dateTime;
            device.UpdatedDateTime = DateTime.Now;



            deviceRepository.Update(device);

            Log.Information($"renew token for  device {deviceId} updated ");

            return device;
        }

        private void CheckIfDeviceAlreadyOnboarded(DeviceOnboardingRequest request)
        {
            var currentDevice = deviceRepository.GetDeviceByMraId(request.EbsMraId);
            if (currentDevice != null)
            {
                throw new Exception("Device already exists");
            }
        }

        public Device? GetDeviceById(Guid deviceId)
        {
            return deviceRepository.GetDeviceById(deviceId);
        }
    }
}
