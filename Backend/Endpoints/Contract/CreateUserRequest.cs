namespace BackendApi.Contract;

public record struct CreateUserRequest(string Email, string Password, int CountryId, int ProvinceId);
