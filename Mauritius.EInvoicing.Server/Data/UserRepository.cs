using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Data.Entities;

namespace Mauritius.EInvoicing.Server.Data
{
    public interface IUserRepository
    {
        void Add(User user);
        User? GetUserByUserName(string userName);
        User? GetUserById(int userId);
        void Update(User user);
        IEnumerable<User> GetAll();
    }
    [RegisterPerRequest]

    public class UserRepository(Repository repository) : IUserRepository
    {
        public void Add(User user)
        {
            repository.Users.Add(user);
            repository.SaveChanges();
        }

        public User? GetUserByUserName(string userName)
        {
            var user = repository.Users.FirstOrDefault(u => u.UserName == userName);
            return user;
        }

        public User? GetUserById(int userId)
        {
            var user = repository.Users.FirstOrDefault(u => u.UserId == userId);
            return user;
        }

        public void Update(User user)
        {
            repository.Users.Update(user);
            repository.SaveChanges();
        }

        public IEnumerable<User> GetAll()
        {
            return repository.Users.ToList();

        }
    }
}
