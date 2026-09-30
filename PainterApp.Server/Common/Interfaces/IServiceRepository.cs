using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Common.Interfaces
{
    public interface IServiceRepository
    {
        Task<int> Create(Service service);
        Task<List<Service>> GetAll();
        Task<int> Update(Service service);
        Task<int> Delete(int id);
    }
}
