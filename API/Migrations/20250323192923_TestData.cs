using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class TestData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "IsActive", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 1, "Samsung s25 Galaxy", "https://via.placeholder.com/150", true, "Samsung S25", 98000m, 10 },
                    { 2, "Samsung s24 Galaxy", "https://via.placeholder.com/150", true, "Samsung S24", 80000m, 20 },
                    { 3, "Samsung s23 Galaxy", "https://via.placeholder.com/150", true, "Samsung S23", 70000m, 30 },
                    { 4, "Samsung s22 Galaxy", "https://via.placeholder.com/150", true, "Samsung S22", 60000m, 40 },
                    { 5, "Samsung s21 Galaxy", "https://via.placeholder.com/150", true, "Samsung S21", 50000m, 50 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
