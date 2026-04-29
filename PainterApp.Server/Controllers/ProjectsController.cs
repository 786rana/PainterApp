using MediatR;
using Microsoft.AspNetCore.Mvc;
using PainterApp.Server.Application.CQRS.Command.ProjectWork;
using PainterApp.Server.Application.CQRS.Queries.ProjectWorks;

namespace PainterApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProjectsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _mediator.Send(new GetAllProjectsQuery()));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProjectCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _mediator.Send(new DeleteProjectCommand { Id = id }));
        }
    }
}
