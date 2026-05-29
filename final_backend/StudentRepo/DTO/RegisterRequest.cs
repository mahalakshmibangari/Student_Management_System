namespace Studentrepo.DTO
{
    public class RegisterRequest
    {
        // Initialize properties to non-null default values to fix CS8618.
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}