using MediatR;
using PainterApp.Server.Application.CQRS.Command.ProjectWork;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Application.Handlers.CommandHandlers.ProjectWorksHandlers
{
    public class CreateProjectHandler : IRequestHandler<CreateProjectCommand, int>
    {
        private readonly IProjectRepository _repo;

        public CreateProjectHandler(IProjectRepository repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
        {
            var project = new ProjectWork
            {
                Title = request.Title,
                ImageUrl = request.ImageUrl,
                Description = request.Description
            };

            return await _repo.Create(project);
        }
    }
}
