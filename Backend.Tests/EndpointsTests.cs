using BackendApi.Database;
using BackendApi.Endpoints;
using BackendApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Tests.Endpoints
{
    public class BackendApiHandlerTest
    {
        [Fact]
        public async Task GetContries_ReturnsOkResult_WithListOfCountries()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            await using var context = new AppDbContext(options);
            context.Countries.Add(new Country
            {
                Id = 1,
                Name = "Country1",
                Provinces = new List<Province>
                {
                    new Province { Id = 1, Name = "Province1" },
                    new Province { Id = 2, Name = "Province2" }
                }
            });
            context.Countries.Add(new Country
            {
                Id = 2,
                Name = "Country2",
                Provinces = new List<Province>
                {
                    new Province { Id = 3, Name = "Province3" }
                }
            });
            await context.SaveChangesAsync();

            // Act
            var result = await BackendApiHandler.GetContries(context);

            // Assert
            var okResult = Assert.IsType<Microsoft.AspNetCore.Http.HttpResults.Ok<List<Country>>>(result);
            var countries = Assert.IsAssignableFrom<IEnumerable<Country>>(okResult.Value);
            Assert.Equal(2, countries.Count());
        }
    }
}