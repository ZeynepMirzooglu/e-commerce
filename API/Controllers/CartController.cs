using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;
    
   public CartController(DataContext context)
   {
    _context = context;
   }
[HttpGet]
public async Task<ActionResult<CartDTO>> GetCart()
{
    return CartToDto(await GetOrCreate());
}
[HttpPost]
public async Task<ActionResult<Cart>> AddToCart(int productId, int quantity)
{
   var cart = await GetOrCreate();
    var product = await _context.Products.FirstOrDefaultAsync(i=>i.Id==productId);
    if (product == null) return NotFound("Product not found");
    cart.AddItem(product, quantity);
    var result =await _context.SaveChangesAsync() > 0;
   if(result) return CreatedAtAction(nameof(GetCart), CartToDto(cart));
   return BadRequest(new ProblemDetails{Title="Problem saving cart"});

}
private async Task<Cart> GetOrCreate(){
 var cart = await _context.Carts.Include(c => c.CartItems).ThenInclude(ci => ci.Product).Where(c => c.CustomerId == Request.Cookies["customerId"]).FirstOrDefaultAsync();
    if (cart == null)
        {
            var customerId =Guid.NewGuid().ToString();
            var cookieOptions= new CookieOptions{
                Expires=DateTime.Now.AddDays(30),
                IsEssential=true,
            };
            Response.Cookies.Append("customerId", customerId, cookieOptions);

            cart = new Cart { CustomerId =customerId };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }
        return cart;
}
[HttpDelete]
public async Task<ActionResult<Cart>> DeleteFromCart(int productId,int quantity)
{
    var cart = await GetOrCreate();
    cart.RemoveItem(productId, quantity);
    var result = await _context.SaveChangesAsync() > 0;
    if (result) return CreatedAtAction(nameof(GetCart), CartToDto(cart));
    return BadRequest(new ProblemDetails { Title = "Problem deleting from the cart" });
}


private CartDTO CartToDto(Cart cart)
{
    
    return new CartDTO{
        CartId = cart.CartId,
        CustomerId = cart.CustomerId,
        CartItems = cart.CartItems.Select(ci => new CartItemDTO{
            
            CartItemId = ci.CartItemId,
            ProductId = ci.ProductId,
            ProductName = ci.Product.Name,
            Price = ci.Product.Price,
            ImageUrl = ci.Product.ImageUrl,
            Quantity = ci.Quantity
        }).ToList() 
    };

}
}