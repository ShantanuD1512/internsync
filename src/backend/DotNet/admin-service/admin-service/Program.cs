using InternSync.AdminService.Data;
using InternSync.AdminService.Repositories;
using InternSync.AdminService.Services;
using Microsoft.EntityFrameworkCore;
using Steeltoe.Discovery.Client;

var builder = WebApplication.CreateBuilder(args);

// Add Steeltoe Discovery Client
builder.Services.AddDiscoveryClient(builder.Configuration);

//Add CORS for React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React app origin
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// EF Core
builder.Services.AddDbContext<AdminDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 25))));

// DI
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<AdminService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Use Steeltoe Discovery Client
app.UseDiscoveryClient();
//app.UseHttpsRedirection();

//Use CORS middleware
app.UseCors("AllowReactApp");

app.UseAuthorization();
app.MapControllers();
app.Run();
