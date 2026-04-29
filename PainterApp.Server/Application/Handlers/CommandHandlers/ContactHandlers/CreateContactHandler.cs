using MediatR;
using PainterApp.Server.Application.CQRS.Command.Contact;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Application.Handlers.CommandHandlers.ContactHandlers
{
    public class CreateContactHandler : IRequestHandler<CreateContactCommand, int>
    {
        private readonly IContactRepository _repo;

        public CreateContactHandler(IContactRepository repo)
        {
            _repo = repo;
        }

        public async Task<int> Handle(CreateContactCommand request, CancellationToken cancellationToken)
        {
            var contact = new ContactRequest
            {
                Name = request.Name,
                Email = request.Email,
                Message = request.Message
            };

            return await _repo.Create(contact);
        }
    }
}
