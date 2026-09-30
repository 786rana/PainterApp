using MediatR;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Application.CQRS.Queries.Contact
{
    public class GetContactsQuery : IRequest<List<ContactRequest>>
    {
    }
}
