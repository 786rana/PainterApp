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
        private readonly IConfiguration _config;

        public AuthController(IMediator mediator, IConfiguration config)
        {
            _mediator = mediator;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterCommand command)
            => _config.GetValue<bool>("Auth:AllowRegistration")
                ? Ok(await _mediator.Send(command))
                : NotFound();

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginCommand command)
            => Ok(await _mediator.Send(command));
    }
}
