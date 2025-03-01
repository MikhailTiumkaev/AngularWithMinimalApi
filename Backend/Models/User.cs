namespace BackendApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
        public Country Country { get; set; } = default!;
        public Province Province { get; set; } = default!;
    }    
}