namespace PainterApp.Server.Domain.Entites
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        /// <summary>Preferred site design ("warm", "midnight", "fresh"); null = not chosen yet.</summary>
        public string? Theme { get; set; }
    }
}
