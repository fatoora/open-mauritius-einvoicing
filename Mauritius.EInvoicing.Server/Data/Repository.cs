using Mauritius.EInvoicing.Server.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Mauritius.EInvoicing.Server.Data
{
    public class Repository : DbContext
    {
        public Repository(DbContextOptions<Repository> options) : base(options)
        {
        }

        public DbSet<Device> Devices { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Buyer> Buyers { get; set; }
        public DbSet<Seller> Sellers { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
