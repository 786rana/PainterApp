using System.Data;
using Dapper;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnection _db;

        public UserRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<User?> GetByEmail(string email)
        {
            var sql = "SELECT * FROM Users WHERE Email = @email";
            return await _db.QueryFirstOrDefaultAsync<User>(sql, new { email });
        }

        public async Task<User?> GetById(int id)
        {
            return await _db.QueryFirstOrDefaultAsync<User>("SELECT * FROM Users WHERE Id = @id", new { id });
        }

        public async Task<int> UpdateTheme(int id, string theme)
        {
            return await _db.ExecuteAsync("UPDATE Users SET Theme = @theme WHERE Id = @id", new { id, theme });
        }

        public async Task<int> Create(User user)
        {
            var sql = @"INSERT INTO Users (Email, PasswordHash)
                    VALUES (@Email, @PasswordHash);
                    SELECT CAST(SCOPE_IDENTITY() as int)";

            return await _db.ExecuteScalarAsync<int>(sql, user);
        }
    }
    
}
