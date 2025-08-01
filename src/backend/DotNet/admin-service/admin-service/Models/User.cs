namespace InternSync.AdminService.Models
{
    public class User
    {
        public int user_id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string contact { get; set; }
        public int? role_id { get; set; }
    }
}
