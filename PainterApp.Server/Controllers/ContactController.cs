using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PainterApp.Server.Application.CQRS.Command.Contact;
using PainterApp.Server.Application.CQRS.Queries.Contact;

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

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _mediator.Send(new GetContactsQuery()));
        }

        [HttpPost]
        public async Task<IActionResult> Send(CreateContactCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
