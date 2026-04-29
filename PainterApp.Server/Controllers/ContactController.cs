using MediatR;
using Microsoft.AspNetCore.Mvc;
using PainterApp.Server.Application.CQRS.Command.Contact;

namespace PainterApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ContactController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Send(CreateContactCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
