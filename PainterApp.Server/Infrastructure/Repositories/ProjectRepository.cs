using System.Data;
using Dapper;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Infrastructure.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly IDbConnection _db;

        public ProjectRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<int> Create(ProjectWork p)
        {
            var sql = @"INSERT INTO Projects (Title, ImageUrl, Description)
                    VALUES (@Title, @ImageUrl, @Description);
                    SELECT CAST(SCOPE_IDENTITY() as int)";
            return await _db.ExecuteScalarAsync<int>(sql, p);
        }

        public async Task<List<ProjectWork>> GetAll()
        {
            return (await _db.QueryAsync<ProjectWork>("SELECT * FROM Projects")).ToList();
        }

        public async Task<int> Delete(int id)
        {
            return await _db.ExecuteAsync("DELETE FROM Projects WHERE Id=@id", new { id });
        }
    }
}
