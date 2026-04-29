using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Common.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
