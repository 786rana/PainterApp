using MediatR;
using PainterApp.Server.Application.CQRS.Queries.Account;
using PainterApp.Server.Common.Interfaces;

namespace PainterApp.Server.Application.Handlers.QueryHandlers.Account
{
    public class GetPreferencesHandler : IRequestHandler<GetPreferencesQuery, PreferencesDto>
    {
        private readonly IUserRepository _repo;

        public GetPreferencesHandler(IUserRepository repo)
        {
            _repo = repo;
        }

        public async Task<PreferencesDto> Handle(GetPreferencesQuery request, CancellationToken cancellationToken)
        {
            var user = await _repo.GetById(request.UserId)
                ?? throw new KeyNotFoundException("User not found");

            return new PreferencesDto(user.Theme);
        }
    }
}
