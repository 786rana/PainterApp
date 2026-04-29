using MediatR;

namespace PainterApp.Server.Application.CQRS.Command.AuthCommand
{
    public class RegisterCommand : IRequest<int>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
