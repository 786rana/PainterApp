using MediatR;
using PainterApp.Server.Application.CQRS.Command.AuthCommand;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Application.Handlers.CommandHandlers.AuthHandlers
{
    public class RegisterHandler : IRequestHandler<RegisterCommand, int>
    {
        private readonly IUserRepository _repo;

        public RegisterHandler(IUserRepository repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            if (await _repo.GetByEmail(request.Email) != null)
                throw new ArgumentException("Email is already registered");

            var user = new User
            {
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            return await _repo.Create(user);
        }
    }
}
