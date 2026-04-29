using MediatR;

namespace PainterApp.Server.Application.CQRS.Command
{
    public class DeleteServiceCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
