namespace BackendApi.Models
{
    public class Country
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public List<Province> Provinces { get; set; } = [];
    }
}