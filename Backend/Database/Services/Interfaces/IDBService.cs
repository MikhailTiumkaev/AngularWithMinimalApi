using BackendApi.Models;

namespace  BackendApi.Database.Services.Interfaces;

public interface IDBServices 
{
    public Task<IResult> GetCountries(CancellationToken ct);
    public Task SaveUser(User user, CancellationToken ct);
}

