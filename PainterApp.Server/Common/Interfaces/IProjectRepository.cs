using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Common.Interfaces
{
    public interface IProjectRepository
    {
        Task<int> Create(ProjectWork project);
        Task<List<ProjectWork>> GetAll();
        Task<int> Delete(int id);
    }
}
