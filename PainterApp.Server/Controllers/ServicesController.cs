
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PainterApp.Server.Application.CQRS.Command;
using PainterApp.Server.Application.CQRS.Queries;

namespace PainterApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ServicesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
            => Ok(await _mediator.Send(new GetServicesQuery()));

        [HttpPost]
        public async Task<IActionResult> Create(CreateServiceCommand command)
            => Ok(await _mediator.Send(command));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateServiceCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            return Ok(await _mediator.Send(command));
        } 
           
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)

            => Ok(await _mediator.Send(new DeleteServiceCommand { Id = id }));
    }
}
