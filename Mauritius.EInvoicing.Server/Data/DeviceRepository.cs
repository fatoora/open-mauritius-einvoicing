using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Data.Entities;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace Mauritius.EInvoicing.Server.Data
{
    public interface IDeviceRepository
    {
        void Add(Device device);
        Device? GetDeviceByMraId(string mraId);
        Device? GetDeviceById(Guid deviceId);
        void Update(Device device);
        IEnumerable<Device> GetAll();
    }

    [RegisterPerRequest]
    public class DeviceRepository(Repository repository) : IDeviceRepository
    {

        public void Add(Device device)
        {
            repository.Devices.Add(device);
            repository.SaveChanges();
        }

        public Device? GetDeviceByMraId(string mraId)
        {
            var device = repository.Devices.FirstOrDefault(d => d.EbsMraId == mraId);
            return device;
        }

        public Device? GetDeviceById(Guid deviceId)
        {
            var device = repository.Devices.FirstOrDefault(d => d.DeviceId == deviceId);
            return device;
        }

        public void Update(Device device)
        {
            repository.Devices.Update(device);
            repository.SaveChanges();
        }

        public IEnumerable<Device> GetAll()
        {
            return repository.Devices.ToList();
        }


    }
}
