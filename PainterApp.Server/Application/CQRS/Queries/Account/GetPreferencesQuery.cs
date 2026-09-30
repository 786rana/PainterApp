using MediatR;

namespace PainterApp.Server.Application.CQRS.Queries.Account
{
    public record PreferencesDto(string? Theme);

    public class GetPreferencesQuery : IRequest<PreferencesDto>
    {
        public int UserId { get; set; }
    }
}
