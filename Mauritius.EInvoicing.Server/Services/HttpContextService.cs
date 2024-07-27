using Agoda.IoC.Core;
using System.Security.Claims;

namespace Mauritius.EInvoicing.Server.Services
{
    public interface IHttpContextService
    {
        string GetCurrentUserName();
    }
    [RegisterPerRequest]
    public class HttpContextService(IHttpContextAccessor contextAccessor) : IHttpContextService
    {
        public string GetCurrentUserName()
        {
            var claims = contextAccessor.HttpContext?.User;

            return claims?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new Exception("User not found");
        }
    }
}
