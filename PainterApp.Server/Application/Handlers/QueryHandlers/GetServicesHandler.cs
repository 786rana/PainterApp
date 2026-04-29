using MediatR;
using PainterApp.Server.Application.CQRS.Queries;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Application.Handlers.QueryHandlers
{
    public class GetServicesHandler : IRequestHandler<GetServicesQuery, List<Service>>
    {
        private readonly IServiceRepository _repo;

        public GetServicesHandler(IServiceRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<Service>> Handle(GetServicesQuery request, CancellationToken cancellationToken)
            => await _repo.GetAll();
    }
}
