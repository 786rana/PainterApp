using MediatR;
using Microsoft.AspNetCore.Mvc;
using PainterApp.Server.Application.CQRS.Command.AuthCommand;

namespace PainterApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterCommand command)
            => Ok(await _mediator.Send(command));

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginCommand command)
            => Ok(await _mediator.Send(command));
    }
}
