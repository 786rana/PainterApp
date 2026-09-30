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
            var sql = @"INSERT INTO Services (Title, TitleAr, Description, DescriptionAr, ImageUrl, Category, SortOrder, Price)
                    VALUES (@Title, @TitleAr, @Description, @DescriptionAr, @ImageUrl, @Category, @SortOrder, @Price);
                    SELECT CAST(SCOPE_IDENTITY() as int)";
            return await _db.ExecuteScalarAsync<int>(sql, s);
        }

        public async Task<List<Service>> GetAll()
        {
            return (await _db.QueryAsync<Service>("SELECT * FROM Services ORDER BY SortOrder, Id")).ToList();
        }

        public async Task<int> Update(Service s)
        {
            var sql = @"UPDATE Services SET Title=@Title, TitleAr=@TitleAr, Description=@Description, DescriptionAr=@DescriptionAr,
                        ImageUrl=@ImageUrl, Category=@Category, SortOrder=@SortOrder, Price=@Price WHERE Id=@Id";
            return await _db.ExecuteAsync(sql, s);
        }

        public async Task<int> Delete(int id)
        {
            return await _db.ExecuteAsync("DELETE FROM Services WHERE Id=@id", new { id });
        }
    }
}
