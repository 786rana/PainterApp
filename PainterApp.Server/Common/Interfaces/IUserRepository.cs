using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Common.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmail(string email);
        Task<int> Create(User user);
    }
}
