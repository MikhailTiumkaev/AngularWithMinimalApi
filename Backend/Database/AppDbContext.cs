using Microsoft.EntityFrameworkCore;
using BackendApi.Models;

namespace BackendApi.Database;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Country> Countries { get; set; }
    public DbSet<Province> Provinces { get; set; }
    public DbSet<User> Users { get; set; }

     protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Call the base version of this method (in DbContext) as well, else we sometimes get an error later on.
        base.OnModelCreating(modelBuilder);

        var countriesToSeed  = new List<Country>();
        var provinceToSeed  = new List<Province>();
        var provinceId =1 ;
        for (int i = 1; i <= 5; i++)
        {
            countriesToSeed.Add( new Country {
                Id = i,
                Name = $"Country #{i}",                
            });
            
            for (int j = 1; j <= 3; j++)
            {
                provinceToSeed.Add( new Province {
                    Id = provinceId,
                    CountryId = i,
                    Name = $"Province #{provinceId}"             
                });
                provinceId++;            
            }
        }



        modelBuilder.Entity<Country>().HasData(countriesToSeed);
        modelBuilder.Entity<Province>().HasData(provinceToSeed);

    }
}