using System.ComponentModel.DataAnnotations;
using MediatR;

namespace PainterApp.Server.Application.CQRS.Command.ProjectWork
{
    public class CreateProjectCommand : IRequest<int>
    {
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;
        [Required, StringLength(1000)]
        public string ImageUrl { get; set; } = string.Empty;
        [Required, StringLength(2000)]
        public string Description { get; set; } = string.Empty;
    }
}
