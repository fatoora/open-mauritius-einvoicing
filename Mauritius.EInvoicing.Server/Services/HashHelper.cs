using System.Security.Cryptography;
using System.Text;

namespace Mauritius.EInvoicing.Server.Services
{
    public class HashHelper
    {
        public static string ComputeSha256Hash(string rawData)
        {
            // Create a SHA256 instance
            // Compute the hash of the input string
            var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(rawData));

            // Convert the byte array to a hexadecimal string
            var builder = new StringBuilder();
            for (var i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("X2"));
            }
            return builder.ToString();
        }
    }
}
