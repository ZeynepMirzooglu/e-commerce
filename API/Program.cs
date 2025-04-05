using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Middlewares;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Scalar.AspNetCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options =>{
    var config = builder.Configuration.GetConnectionString("DefaultConnection");
    
    options.UseSqlite(config);
});
builder.Services.AddCors();
builder.Services.AddIdentity<AppUser,AppRole>().AddEntityFrameworkStores<DataContext>();
builder.Services.Configure<IdentityOptions>(options => {
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;

    options.User.RequireUniqueEmail = true;
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    
    options.SignIn.RequireConfirmedEmail = false;
    options.Lockout.AllowedForNewUsers = true;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;

});
builder.Services.AddAuthentication(x=>{
    x.DefaultAuthenticateScheme =JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(x=>{
    x.RequireHttpsMetadata = false;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["JWTSecurity:SecretKey"]!)),
        ValidateIssuer = false, // true, ile issuer kontrolü yapılır.(Şirket bilgisi vs.)
        ValidIssuer = builder.Configuration["JWTSecurity:Issuer"],
        //ValidIssuers = new[] { builder.Configuration["JWTSecurity:Issuer"] },
        ValidateAudience = false,
        ValidAudience = builder.Configuration["JWTSecurity:Audience"],
        ValidateLifetime = true,
    };

});
builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddScoped<TokenService>();
builder.Services.AddOpenApi();

var app = builder.Build();
app.UseMiddleware<ExceptionHandling>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options=> {
        options.SwaggerEndpoint("/openapi/v1.json", "Demo API");
    });
    app.MapScalarApiReference();

}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors(options=>{
    options.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
SeedDatabase.Initialize(app);
app.Run();
