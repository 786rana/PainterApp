using System.ComponentModel.DataAnnotations;
using MediatR;

namespace PainterApp.Server.Application.CQRS.Command.Account
{
    public class UpdateThemeCommand : IRequest<bool>
    {
        public int UserId { get; set; }

        [Required, RegularExpression("^(warm|midnight|fresh)$", ErrorMessage = "Theme must be 'warm', 'midnight' or 'fresh'.")]
        public string Theme { get; set; } = "warm";
    }

    /// <summary>Request body for PUT /api/account/preferences.</summary>
    public class UpdateThemeRequest
    {
        [Required, RegularExpression("^(warm|midnight|fresh)$", ErrorMessage = "Theme must be 'warm', 'midnight' or 'fresh'.")]
        public string Theme { get; set; } = "warm";
    }
}
