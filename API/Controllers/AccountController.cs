using API.DTO;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;
    public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
    {
        _tokenService = tokenService;
        _userManager = userManager;
    }
 
    [HttpPost("login")]
    public async Task<ActionResult<AppUser>> Login(LoginDTO model)
    {
        var user= await _userManager.FindByNameAsync(model.UserName);
        if(user==null) return BadRequest("User not found");
        var result= await _userManager.CheckPasswordAsync(user,model.Password);
        if(result) return Ok(new {token=await _tokenService.GenerateToken(user)});
        return Unauthorized();
    }
    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> CreateUser(RegisterDTO model)
    {
        if(!ModelState.IsValid) return BadRequest(ModelState);
        var user= new AppUser
        {
            Name=model.Name,
            UserName=model.UserName,
            Email=model.Email,
        };
        var result= await _userManager.CreateAsync(user,model.Password);
        if(result.Succeeded){ 
            await _userManager.AddToRoleAsync(user,"Customer");
            return StatusCode(201);}
        return BadRequest(result.Errors);
    }

}