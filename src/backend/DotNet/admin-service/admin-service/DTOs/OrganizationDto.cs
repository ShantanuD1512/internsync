namespace InternSync.AdminService.DTOs
{
    public class OrganizationDto
    {
        public int organization_id { get; set; }
        public string org_name { get; set; }
        public string RegistrationNumber { get; set; }
        public bool IsApproved { get; set; }
    }
}
