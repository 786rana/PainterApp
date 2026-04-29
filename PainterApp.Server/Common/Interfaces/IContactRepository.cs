using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Common.Interfaces
{
    public interface IContactRepository
    {
        Task<int> Create(ContactRequest contact);
        Task<List<ContactRequest>> GetAll();
    }
}
