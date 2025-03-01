using BackendApi.Endpoints;
using BackendApi.Database;
using Microsoft.EntityFrameworkCore;
using BackendApi.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddWebServices();
builder.Services.AddDataServices(builder.Configuration);

var app = builder.Build();

app.MapGroup("/").MapBackendApiEndpoints();

if (app.Environment.IsDevelopment())
{
    await using var scope = app.Services.CreateAsyncScope();
    await using var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        
    await dbContext.Database.MigrateAsync();
    await dbContext.Database.EnsureCreatedAsync();

    app.UseCors("CORSPolicy");

}

app.Run();