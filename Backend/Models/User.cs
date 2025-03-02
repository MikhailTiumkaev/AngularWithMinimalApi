namespace BackendApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; } = default!;
        public int CountryId { get; set; }
        public int ProvinceId { get; set; }
    }    
}