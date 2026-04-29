using MediatR;

namespace PainterApp.Server.Application.CQRS.Command
{
    public class CreateServiceCommand : IRequest<int>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
