using MediatR;

namespace PainterApp.Server.Application.CQRS.Command.Contact
{
    public class CreateContactCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
    }
}
