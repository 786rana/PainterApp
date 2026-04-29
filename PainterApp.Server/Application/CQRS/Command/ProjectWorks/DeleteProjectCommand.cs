using MediatR;

namespace PainterApp.Server.Application.CQRS.Command.ProjectWork
{
    public class DeleteProjectCommand : IRequest<int>
    {
        public int Id { get; set; }
    }

}
