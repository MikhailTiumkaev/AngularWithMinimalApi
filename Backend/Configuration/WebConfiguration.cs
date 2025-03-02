using Microsoft.AspNetCore.Http.Features;

namespace BackendApi.Configuration;
public static class WebConfiguration
{
    public static void AddWebServices(this IServiceCollection services)
    {
        services.AddCors(options=>{
            options.AddPolicy("CORSPolicy",
            builder => {
                builder
                .AllowAnyHeader()
                .AllowAnyHeader()
                .WithOrigins("http://localhost:4200");
            });
        });
        services.AddEndpointsApiExplorer();
        services.AddProblemDetails(
        options => {
            options.CustomizeProblemDetails = context => {
                context.ProblemDetails.Instance = $"{context.HttpContext.Request.Method} {context.HttpContext.Request.Path}";
                context.ProblemDetails.Extensions.TryAdd("requestId", context.HttpContext.TraceIdentifier);
                var activity = context.HttpContext.Features.Get<IHttpActivityFeature>()?.Activity;
                context.ProblemDetails.Extensions.TryAdd("traceId", activity?.Id);
            };
        });       
    }
}