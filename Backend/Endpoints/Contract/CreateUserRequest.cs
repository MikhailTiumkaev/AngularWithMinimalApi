namespace BackendApi.Endpoints.Contract;

public record struct CreateUserRequest(string Login, int CountryId, int ProvinceId);
