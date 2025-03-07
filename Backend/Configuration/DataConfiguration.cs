using BackendApi.Database;
using BackendApi.Database.Services;
using BackendApi.Database.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Configuration;
public static class DataConfiguration
{
    public static void AddDataServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(
        options => options
        .UseSqlite(configuration.GetConnectionString("Database")));
        services.AddScoped<IDBServices, DBService>();
    }
}


