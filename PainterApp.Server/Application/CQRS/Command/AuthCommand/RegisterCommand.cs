using System.ComponentModel.DataAnnotations;
using MediatR;

namespace PainterApp.Server.Application.CQRS.Command.AuthCommand
{
    public class RegisterCommand : IRequest<int>
    {
        [Required, EmailAddress, StringLength(256)]
        public string Email { get; set; } = string.Empty;
        [Required, StringLength(100, MinimumLength = 8)]
        public string Password { get; set; } = string.Empty;
    }
}
