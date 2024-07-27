using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Contracts.MraContracts;

namespace Mauritius.EInvoicing.Server.Services;

public interface IMraAuthService
{
    Task<MraAuthResponse> GenerateToken(DeviceOnboardingRequest request);
}