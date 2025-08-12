namespace InternSync.AdminService.Models
{
    public class Student
    {
        public int student_id { get; set; }
        public int user_id { get; set; }
        public string student_name { get; set; }
        public string gender { get; set; }
        public ICollection<StudentEducation> Educations { get; set; }
        public ICollection<Skill> Skills { get; set; }
    }
}