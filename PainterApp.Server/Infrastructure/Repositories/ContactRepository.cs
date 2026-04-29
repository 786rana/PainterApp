using System.Data;
using Dapper;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Infrastructure.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly IDbConnection _db;

        public ContactRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<int> Create(ContactRequest c)
        {
            var sql = @"INSERT INTO Contacts (Name, Email, Message)
                    VALUES (@Name, @Email, @Message);
                    SELECT CAST(SCOPE_IDENTITY() as int)";
            return await _db.ExecuteScalarAsync<int>(sql, c);
        }

        public async Task<List<ContactRequest>> GetAll()
        {
            return (await _db.QueryAsync<ContactRequest>("SELECT * FROM Contacts")).ToList();
        }
    }
}
