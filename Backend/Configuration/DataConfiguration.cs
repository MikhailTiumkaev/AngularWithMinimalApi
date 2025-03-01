using BackendApi.Database;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Configuration;
public static class DataConfiguration
{
    public static void AddDataServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(
        options => options
        .UseSqlite(configuration.GetConnectionString("Database"))); 
    }
}


