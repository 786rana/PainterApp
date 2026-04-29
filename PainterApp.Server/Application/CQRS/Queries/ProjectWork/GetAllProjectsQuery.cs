using MediatR;
using PainterApp.Server.Domain.Entites;

namespace PainterApp.Server.Application.CQRS.Queries.ProjectWorks
{
    public class GetAllProjectsQuery : IRequest<List<ProjectWork>>
    {
    }
}
