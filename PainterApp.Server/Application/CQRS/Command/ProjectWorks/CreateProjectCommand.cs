using MediatR;

namespace PainterApp.Server.Application.CQRS.Command.ProjectWork
{
    public class CreateProjectCommand : IRequest<int>
    {
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
    }
}
