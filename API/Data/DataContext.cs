using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new List<Product>
            {
                new Product { Id = 1, Name = "Samsung S25", Description = "Samsung s25 Galaxy", Price = 98000, IsActive = true, ImageUrl = "https://via.placeholder.com/150", Stock = 10 },
                new Product { Id = 2, Name = "Samsung S24", Description = "Samsung s24 Galaxy", Price = 80000, IsActive = true, ImageUrl = "https://via.placeholder.com/150", Stock = 20 },
                new Product { Id = 3, Name = "Samsung S23", Description = "Samsung s23 Galaxy", Price = 70000, IsActive = true, ImageUrl = "https://via.placeholder.com/150", Stock = 30 },
                new Product { Id = 4, Name = "Samsung S22", Description = "Samsung s22 Galaxy", Price = 60000, IsActive = true, ImageUrl = "https://via.placeholder.com/150", Stock = 40 },
                new Product { Id = 5, Name = "Samsung S21", Description = "Samsung s21 Galaxy", Price = 50000, IsActive = true, ImageUrl = "https://via.placeholder.com/150", Stock = 50 }
            }
        );
    }
}
