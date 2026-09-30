using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Common.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmail(string email);
        Task<User?> GetById(int id);
        Task<int> Create(User user);
        Task<int> UpdateTheme(int id, string theme);
    }
}
