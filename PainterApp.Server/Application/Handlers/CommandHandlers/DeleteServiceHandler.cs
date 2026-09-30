using MediatR;
using PainterApp.Server.Application.CQRS.Command;
using PainterApp.Server.Common.Interfaces;

namespace PainterApp.Server.Application.Handlers.CommandHandlers
{
    public class DeleteServiceHandler : IRequestHandler<DeleteServiceCommand, bool>
    {
        private readonly IServiceRepository _repo;

        public DeleteServiceHandler(IServiceRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(DeleteServiceCommand request, CancellationToken cancellationToken)
        {
            if (await _repo.Delete(request.Id) == 0)
                throw new KeyNotFoundException("Service not found");

            return true;
        }
    }
}
