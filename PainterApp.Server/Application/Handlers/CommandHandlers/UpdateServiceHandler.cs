using MediatR;
using PainterApp.Server.Application.CQRS.Command;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Application.Handlers.CommandHandlers
{
    public class UpdateServiceHandler : IRequestHandler<UpdateServiceCommand, bool>
    {
        private readonly IServiceRepository _repo;

        public UpdateServiceHandler(IServiceRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(UpdateServiceCommand request, CancellationToken cancellationToken)
        {
            var rows = await _repo.Update(new Service
            {
                Id = request.Id,
                Title = request.Title,
                Description = request.Description,
                Price = request.Price
            });

            if (rows == 0)
                throw new KeyNotFoundException("Service not found");

            return true;
        }
    }
}
