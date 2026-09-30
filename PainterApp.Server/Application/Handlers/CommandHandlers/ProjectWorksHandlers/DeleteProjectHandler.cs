using MediatR;
using PainterApp.Server.Application.CQRS.Command.ProjectWork;
using PainterApp.Server.Common.Interfaces;

namespace PainterApp.Server.Application.Handlers.CommandHandlers.ProjectWorksHandlers
{
    public class DeleteProjectHandler : IRequestHandler<DeleteProjectCommand, int>
    {
        private readonly IProjectRepository _repo;

        public DeleteProjectHandler(IProjectRepository repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(DeleteProjectCommand request, CancellationToken cancellationToken)
        {
            if (await _repo.Delete(request.Id) == 0)
                throw new KeyNotFoundException("Project not found");

            return request.Id;
        }
    }
}
