namespace API.Entity;

public class Cart
{
    public int CartId { get; set; }
    public string CustomerId { get; set; } = null!;
    public List<CartItem> CartItems { get; set; } = new();

    public void AddItem(Product product, int quantity)
    {
        var cartItem = CartItems.FirstOrDefault(x => x.ProductId == product.Id);
        if (cartItem != null)
        {
            cartItem.Quantity += quantity;
        }
        else
        {
            CartItems.Add(new CartItem { Product = product, Quantity = quantity });
        }
    }
    public void RemoveItem(int productId,int quantity)
    {
        var cartItem = CartItems.Where(x => x.ProductId == productId).FirstOrDefault();
        if(cartItem == null) return;
        cartItem.Quantity -= quantity;
        if(cartItem.Quantity == 0){
        CartItems.Remove(cartItem);
        }

    }
    public void ClearCart()
    {
        CartItems.Clear();
    }
 


}
public class CartItem
{
    public int CartItemId { get; set; }
    public int  ProductId { get; set; }
    public Product Product { get; set; } =null!;
    public int CartId { get; set; }
    /// <summary>
    /// public Cart Cart { get; set; } = null!;
    /// </summary>
    public int Quantity { get; set; }

}