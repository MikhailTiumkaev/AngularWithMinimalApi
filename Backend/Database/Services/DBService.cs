using BackendApi.Database.Services.Interfaces;
using BackendApi.Models;
using Microsoft.EntityFrameworkCore;

namespace  BackendApi.Database.Services;
public class DBService  (AppDbContext _appDbContext, ILogger<DBService> _logger): IDBServices
{
    public async Task<List<Country>> GetCountries(CancellationToken ct)
    {
        var countries = await _appDbContext.Countries
            .AsNoTracking()
            .Include(country => country.Provinces)
            .ToListAsync(cancellationToken: ct);

        return countries;
    }

    public async Task SaveUser(User user, CancellationToken ct)
    {
        _appDbContext.Users.Add(user);
        await _appDbContext.SaveChangesAsync(ct);
        _logger.LogInformation("User {Login} was successfully stored in DB", user.Login);
        
    }
}
