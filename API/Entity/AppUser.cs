using Microsoft.AspNetCore.Identity;

namespace API.Entity;

public class AppUser : IdentityUser
{
    public string? Name { get; set; } = string.Empty;
    // public string? ImageUrl { get; set; }
    // public string? Address { get; set; }
    // public string? City { get; set; }
    // public string? Country { get; set; }
    // public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    // public DateTime LastActive { get; set; } = DateTime.UtcNow;
}