
namespace API.DTO
{
    public class CreateOrderDTO
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string City { get; set; } = null!;

        public string? CardName { get; set; }
        public string? CardNumber { get; set; }
        public string? CardExpireMonth { get; set; }
        public string? CardExpireYear { get; set; }
        public string? CardCvc { get; set; }
    
    }
}