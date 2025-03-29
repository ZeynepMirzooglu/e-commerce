using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")]

public class ErrorController : ControllerBase
{
 
    [HttpGet("not-found")]
    public IActionResult ErrorNotFound()
    {
      return NotFound(); //404 error
    }
    [HttpGet("server-error")]
    public IActionResult ErrorServerError()
    {
        throw new Exception("Server Error"); //500 error
      //return StatusCode(500); //500 error
    }
    [HttpGet("bad-request")]
    public IActionResult ErrorBadRequest()
    {
        return BadRequest(); //400 error
    }
    [HttpGet("unauthorized")]
    public IActionResult ErrorUnauthorized()
    {
        return Unauthorized(); //401 error
    }
    [HttpGet("validation-error")]
    public IActionResult ValidationError()
    {
        ModelState.AddModelError("validation error", "This is a validation error");
         ModelState.AddModelError("validation error2", "This is a validation error2");
        return ValidationProblem();
    }
}