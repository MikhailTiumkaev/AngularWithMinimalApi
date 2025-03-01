using BackendApi.Contract;
using BackendApi.Database;
using BackendApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Endpoints;

public static class BackendApiHandler
{
    public static RouteGroupBuilder MapBackendApiEndpoints(this RouteGroupBuilder routes)
    {
        routes.MapPost("/users/", CreateUserRequestTask);
        routes.MapGet("/contries/", GetContries);
        return routes;
    }

    public static async Task<IResult> CreateUserRequestTask(
        CreateUserRequest createUserRequest,
        AppDbContext dbContext,
        CancellationToken ct = default)
    {
        User user = new()
        {
            Email = createUserRequest.Email,
            Password = createUserRequest.Password,
            //Country = createUserRequest.Country,
            //Province = createUserRequest.Province
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