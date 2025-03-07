using BackendApi.Models;

namespace  BackendApi.Database.Services.Interfaces;

public interface IDBServices 
{
    public Task<List<Country>> GetCountries(CancellationToken ct);
    public Task SaveUser(User user, CancellationToken ct);
}

