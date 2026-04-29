using System.Data;
using Dapper;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Infrastructure.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly IDbConnection _db;

        public ServiceRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<int> Create(Service s)
        {
            var sql = @"INSERT INTO Services (Title, Description, Price)
                    VALUES (@Title, @Description, @Price);
                    SELECT CAST(SCOPE_IDENTITY() as int)";
            return await _db.ExecuteScalarAsync<int>(sql, s);
        }

        public async Task<List<Service>> GetAll()
        {
            return (await _db.QueryAsync<Service>("SELECT * FROM Services")).ToList();
        }

        public async Task Update(Service s)
        {
            var sql = "UPDATE Services SET Title=@Title, Description=@Description, Price=@Price WHERE Id=@Id";
            await _db.ExecuteAsync(sql, s);
        }

        public async Task Delete(int id)
        {
            await _db.ExecuteAsync("DELETE FROM Services WHERE Id=@id", new { id });
        }
    }
}
