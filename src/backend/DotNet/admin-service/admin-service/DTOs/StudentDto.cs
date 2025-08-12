using System.Collections.Generic;
namespace InternSync.AdminService.DTOs
{
    public class StudentEducationDto
    {
        public string Level { get; set; }
        public string InstitutionName { get; set; }
        public string Board { get; set; }
        public string Grade { get; set; }
        public int PassingYear { get; set; }
    }

    public class StudentDto
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; }
        public string Gender { get; set; }
        public List<StudentEducationDto> Education { get; set; }
        public List<string> Skills { get; set; }
    }
}
