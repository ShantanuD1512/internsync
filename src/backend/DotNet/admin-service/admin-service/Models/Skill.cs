namespace InternSync.AdminService.Models
{
    public class Skill
    {
        public int skill_id { get; set; }
        public string skill_name { get; set; }
        public int? student_id { get; set; }
        public Student Student { get; set; }
    }
}