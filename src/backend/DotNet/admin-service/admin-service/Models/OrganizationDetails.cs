namespace InternSync.AdminService.Models
{
    public class OrganizationDetails
    {
        public int organization_id { get; set; }
        public int? user_id { get; set; }
        public string org_name { get; set; }
        public string registration_number { get; set; }
        public int? domain_id { get; set; }
        public bool is_approved { get; set; }
    }
}
