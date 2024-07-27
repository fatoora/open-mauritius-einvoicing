using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Data;
using Mauritius.EInvoicing.Server.Data.Entities;

namespace Mauritius.EInvoicing.Server.Services
{
    public interface IUserService
    {
        void AddUser(UserAddRequest user);
        void UpdatePassword(string currentPassword, string newPassword);
    }
    [RegisterPerRequest]
    public class UserService(IUserRepository userRepository, IHttpContextService httpContextService) : IUserService
    {

        public void AddUser(UserAddRequest user)
        {

            var currentUser = userRepository.GetUserByUserName(user.UserName);
            if (currentUser != null)
            {
                throw new Exception("User already exists");
            }


            var password = HashHelper.ComputeSha256Hash(user.Password);

            var userData = new User()
            {
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                Email = user.Email,
                Password = password,
                IsAdmin = user.IsAdmin
            };

            userRepository.Add(userData);
        }

        public void UpdatePassword(string currentPassword, string newPassword)
        {
            var userName = httpContextService.GetCurrentUserName();
            var user = userRepository.GetUserByUserName(userName);


            if (user == null)
            {
                throw new Exception("user context not found, Please login again");
            }

            var hashedCurrentPassword = HashHelper.ComputeSha256Hash(currentPassword);

            if (user.Password != hashedCurrentPassword)
            {
                throw new Exception("Provided current password is wrong");
            }

            var hashedNewPassword = HashHelper.ComputeSha256Hash(newPassword);

            user.Password = hashedNewPassword;
            userRepository.Update(user);


        }

    }
}
