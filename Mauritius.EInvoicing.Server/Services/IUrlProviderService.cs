using Mauritius.EInvoicing.Server.Contracts.MraContracts;

namespace Mauritius.EInvoicing.Server.Services;

public interface IUrlProviderService
{
    MraUrl GetMraUrl();
}