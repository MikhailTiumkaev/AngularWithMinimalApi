using BackendApi.Database.Services.Interfaces;
using BackendApi.Endpoints.Contract;
using BackendApi.Models;

namespace BackendApi.Endpoints;

public static class BackendApiHandler
{
    public static async Task<IResult> CreateUserRequestTask(
        CreateUserRequest createUserRequest,
        IDBServices dbService,
        CancellationToken ct = default)
    {
        User user = new()
        {
            Login = createUserRequest.Login,
            CountryId = createUserRequest.CountryId,
            ProvinceId = createUserRequest.ProvinceId
        };

        await dbService.SaveUser(user, ct);  

        return Results.Created($"/user/{user!.Id}", user);
    }

    public static async Task<IResult> GetContries(
        IDBServices dbService, 
        CancellationToken ct = default)
    {
        return Results.Ok(await dbService.GetCountries(ct));        
    }
}