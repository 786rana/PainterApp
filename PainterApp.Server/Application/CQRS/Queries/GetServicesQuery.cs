using MediatR;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Application.CQRS.Queries
{
    public class GetServicesQuery : IRequest<List<Service>> { }
}
