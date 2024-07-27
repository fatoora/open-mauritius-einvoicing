using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Data.Entities;

namespace Mauritius.EInvoicing.Server.Services;

public interface IDeviceService
{
    Task OnBoardDevice(DeviceOnboardingRequest request);
    Device? GetDeviceById(Guid deviceId);
    Task<Device> RenewToken(Guid deviceId);

}