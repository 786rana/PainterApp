namespace PainterApp.Server.Domain.Entites
{
    public class ContactRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
    }
}
