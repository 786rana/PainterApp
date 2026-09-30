using System.Reflection;
using System.Text.RegularExpressions;
using Dapper;
using Microsoft.Data.SqlClient;

namespace PainterApp.Server.Infrastructure.Db
{
    /// <summary>
    /// Optional start-up setup for hosted environments: applies the idempotent
    /// database/schema.sql and creates the first admin account.
    /// Enabled with Database:AutoMigrate=true; the admin comes from Admin:Email / Admin:Password.
    /// </summary>
    public static class DatabaseInitializer
    {
        private static readonly Regex BatchSeparator =
            new(@"^\s*GO\s*$", RegexOptions.Multiline | RegexOptions.IgnoreCase | RegexOptions.Compiled);

        public static async Task RunAsync(IConfiguration config, ILogger logger)
        {
            if (!config.GetValue<bool>("Database:AutoMigrate"))
                return;

            var connectionString = config.GetConnectionString("Default")
                ?? throw new InvalidOperationException("ConnectionStrings:Default is not configured.");

            await using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            foreach (var batch in LoadSchemaBatches())
                await connection.ExecuteAsync(batch);

            logger.LogInformation("Database schema is up to date.");

            var email = config["Admin:Email"];
            var password = config["Admin:Password"];
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                return;

            var users = await connection.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM Users");
            if (users > 0)
                return;

            await connection.ExecuteAsync(
                "INSERT INTO Users (Email, PasswordHash) VALUES (@Email, @PasswordHash)",
                new { Email = email.Trim(), PasswordHash = BCrypt.Net.BCrypt.HashPassword(password) });

            logger.LogInformation("Created the first admin account ({Email}).", email.Trim());
        }

        /// <summary>The schema script minus the local-only CREATE DATABASE / USE statements.</summary>
        private static IEnumerable<string> LoadSchemaBatches()
        {
            var assembly = Assembly.GetExecutingAssembly();
            using var stream = assembly.GetManifestResourceStream("schema.sql")
                ?? throw new InvalidOperationException("Embedded schema.sql was not found.");
            using var reader = new StreamReader(stream);
            var script = reader.ReadToEnd();

            foreach (var batch in BatchSeparator.Split(script))
            {
                var sql = batch.Trim();
                if (sql.Length == 0) continue;
                if (sql.Contains("CREATE DATABASE", StringComparison.OrdinalIgnoreCase)) continue;
                if (Regex.IsMatch(sql, @"^USE\s", RegexOptions.IgnoreCase)) continue;
                yield return sql;
            }
        }
    }
}
