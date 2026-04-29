using MediatR;
using PainterApp.Server.Application.CQRS.Queries.ProjectWorks;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Application.Handlers.QueryHandlers.ProjectWorks
{
    public class GetAllProjectsHandler : IRequestHandler<GetAllProjectsQuery, List<ProjectWork>>
    {
        private readonly IProjectRepository _repo;

        public GetAllProjectsHandler(IProjectRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<ProjectWork>> Handle(GetAllProjectsQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAll();
        }
    }
}
