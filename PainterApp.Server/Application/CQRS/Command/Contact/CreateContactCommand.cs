using System.ComponentModel.DataAnnotations;
using MediatR;

namespace PainterApp.Server.Application.CQRS.Command.Contact
{
    public class CreateContactCommand : IRequest<int>
    {
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required, EmailAddress, StringLength(256)]
        public string Email { get; set; } = string.Empty;
        [Required, StringLength(2000)]
        public string Message { get; set; } = string.Empty;
    }
}
