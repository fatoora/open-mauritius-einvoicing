using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Contracts.MraContracts;

namespace Mauritius.EInvoicing.Server.Services
{
    [RegisterSingleton]
    public class UrlProviderService : IUrlProviderService
    {

        public MraUrl GetMraUrl()
        {
            return new MraUrl
            {
                Base = "https://vfisc.mra.mu",
                Auth = "/einvoice-token-service/token-api/generate-token",
                Transmission = "/realtime/invoice/transmit"
            };
        }
    }
}
