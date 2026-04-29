using MediatR;
using PainterApp.Server.Application.CQRS.Command;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Application.Handlers.CommandHandlers
{
    public class CreateServiceHandler : IRequestHandler<CreateServiceCommand, int>
    {
        private readonly IServiceRepository _repo;

        public CreateServiceHandler(IServiceRepository repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateServiceCommand request, CancellationToken cancellationToken)
        {
            return await _repo.Create(new Service
            {
                Title = request.Title,
                Description = request.Description,
                Price = request.Price
            });
        }
    }
}
