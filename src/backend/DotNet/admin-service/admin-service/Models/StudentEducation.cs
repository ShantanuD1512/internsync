namespace InternSync.AdminService.Models
{
    public class StudentEducation
    {
        public int education_id { get; set; }
        public int student_id { get; set; }
        public string level { get; set; }
        public string institution_name { get; set; }
        public string board { get; set; }
        public string grade { get; set; }
        public int passing_year { get; set; }

        public Student Student { get; set; }
    }
}