using MediatR;
using PainterApp.Server.Application.CQRS.Queries.Contact;
using PainterApp.Server.Common.Interfaces;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Application.Handlers.QueryHandlers.Contact
{
    public class GetContactsHandler : IRequestHandler<GetContactsQuery, List<ContactRequest>>
    {
        private readonly IContactRepository _repo;

        public GetContactsHandler(IContactRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<ContactRequest>> Handle(GetContactsQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAll();
        }
    }
}
