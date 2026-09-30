using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PainterApp.Server.Application.CQRS.Command.Account;
using PainterApp.Server.Application.CQRS.Queries.Account;

namespace PainterApp.Server.Controllers
{
    [Route("api/account")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        private int CurrentUserId =>
            int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id)
                ? id
                : throw new UnauthorizedAccessException("Invalid token");

        [HttpGet("preferences")]
        public async Task<IActionResult> GetPreferences()
            => Ok(await _mediator.Send(new GetPreferencesQuery { UserId = CurrentUserId }));

        [HttpPut("preferences")]
        public async Task<IActionResult> UpdatePreferences(UpdateThemeRequest request)
        {
            await _mediator.Send(new UpdateThemeCommand { UserId = CurrentUserId, Theme = request.Theme });
            return NoContent();
        }
    }
}
