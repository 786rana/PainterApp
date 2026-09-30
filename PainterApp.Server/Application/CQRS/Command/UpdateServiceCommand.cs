using System.ComponentModel.DataAnnotations;
using MediatR;

namespace PainterApp.Server.Application.CQRS.Command
{
    public class UpdateServiceCommand : IRequest<bool>
    {
        public int Id { get; set; }
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;
        [Required, StringLength(2000)]
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}
