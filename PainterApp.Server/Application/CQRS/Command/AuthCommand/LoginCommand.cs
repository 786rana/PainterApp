using MediatR;

namespace PainterApp.Server.Application.CQRS.Command.AuthCommand
{
    public class LoginCommand : IRequest<string>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
