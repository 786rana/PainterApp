using MediatR;
using PainterApp.Server.Application.CQRS.Command.Account;
using PainterApp.Server.Common.Interfaces;

namespace PainterApp.Server.Application.Handlers.CommandHandlers.AccountHandlers
{
    public class UpdateThemeHandler : IRequestHandler<UpdateThemeCommand, bool>
    {
        private readonly IUserRepository _repo;

        public UpdateThemeHandler(IUserRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(UpdateThemeCommand request, CancellationToken cancellationToken)
        {
            if (await _repo.UpdateTheme(request.UserId, request.Theme) == 0)
                throw new KeyNotFoundException("User not found");

            return true;
        }
    }
}
