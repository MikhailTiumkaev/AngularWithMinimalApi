namespace BackendApi.Endpoints.RouteExtension;

public static class BackendApiRouterMapping
{
    public static RouteGroupBuilder MapBackendApiEndpoints(this RouteGroupBuilder routes)
    {
        routes.MapPost("/user/", BackendApiHandler.CreateUserRequestTask);
        routes.MapGet("/country/", BackendApiHandler.GetContries);
        return routes;
    }
}