namespace  BackendApi.Models
{
    public class Province
    {
        public int Id { get; set; }
        public int CountryId { get; set; }
        public string Name { get; set; } = default!;    

    }
}