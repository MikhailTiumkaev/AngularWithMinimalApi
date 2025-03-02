using BackendApi.Contract;
using BackendApi.Database;
using BackendApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Endpoints;

public static class BackendApiHandler
{
    public static RouteGroupBuilder MapBackendApiEndpoints(this RouteGroupBuilder routes)
    {
        routes.MapPost("/user/", CreateUserRequestTask);
        routes.MapGet("/country/", GetContries);
        return routes;
    }

    public static async Task<IResult> CreateUserRequestTask(
        CreateUserRequest createUserRequest,
        AppDbContext dbContext,
        CancellationToken ct = default)
    {
        User user = new()
        {
            Login = createUserRequest.Login,
            CountryId = createUserRequest.CountryId,
            ProvinceId = createUserRequest.ProvinceId
        };

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync(ct);

        return Results.Created($"/user/{user!.Id}", user);
    }

    public static async Task<IResult> GetContries(
        AppDbContext context,
        CancellationToken ct = default)
    {
        //eager loading country with provinces
        var countries = await context.Countries
            .AsNoTracking()
            .Include(country => country.Provinces)
            .ToListAsync(cancellationToken: ct);

        return Results.Ok(countries);
    }
}