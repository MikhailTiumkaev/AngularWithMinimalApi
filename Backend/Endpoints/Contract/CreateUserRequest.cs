namespace BackendApi.Contract;

public record struct CreateUserRequest(string Login, int CountryId, int ProvinceId);
