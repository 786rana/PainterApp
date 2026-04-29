using MediatR;
using PainterApp.Server.Application.CQRS.Command.AuthCommand;
using PainterApp.Server.Common.Interfaces;

namespace PainterApp.Server.Application.Handlers.CommandHandlers.AuthHandlers
{
    public class LoginHandler : IRequestHandler<LoginCommand, string>
    {
        private readonly IUserRepository _repo;
        private readonly IJwtService _jwt;

        public LoginHandler(IUserRepository repo, IJwtService jwt)
        {
            _repo = repo;
            _jwt = jwt;
        }

        public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = await _repo.GetByEmail(request.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                throw new Exception("Invalid credentials");

            return _jwt.GenerateToken(user);
        }
    }
}
