package com.internsync.student.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.internsync.student.dto.DashboardDto;
import com.internsync.student.dto.InternshipDto;
import com.internsync.student.entity.Application;
import com.internsync.student.entity.Document;
import com.internsync.student.entity.Education;
import com.internsync.student.entity.Skill;
import com.internsync.student.entity.Student;
import com.internsync.student.entity.User;
import com.internsync.student.repository.ApplicationRepository;
import com.internsync.student.repository.DocumentRepository;
import com.internsync.student.repository.EducationRepository;
import com.internsync.student.repository.SkillRepository;
import com.internsync.student.repository.StudentRepository;
import com.internsync.student.repository.UserRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private EducationRepository educationRepo;

    @Autowired
    private DocumentRepository documentRepo;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ApplicationRepository applicationRepo;
    
    @Autowired
    private UserRepository userRepository;
    
   


    private RestTemplate restTemplate = new RestTemplate();

//    /**
//     * Fetch aggregated student dashboard data including profile, education, documents,
//     * applications, internships, interviews, and skills.
//     */
    public DashboardDto getStudentDashboard(Integer studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<Education> educations = educationRepo.findByStudent_StudentId(studentId);
        List<Document> documents = documentRepo.findByStudent_StudentId(studentId);
        List<Application> applications = applicationRepo.findByStudent_StudentId(studentId);
        List<Skill> skills = skillRepository.findByStudent_StudentId(studentId);

        // Fetch internships from organization service endpoint
        String orgUrl = "http://localhost:8082/api/org/internship/all";
        InternshipDto[] internships = restTemplate.getForObject(orgUrl, InternshipDto[].class);

        DashboardDto dashboard = new DashboardDto();
        dashboard.setStudent(student);
        dashboard.setEducations(educations);
        dashboard.setDocuments(documents);
        dashboard.setApplications(applications);
        dashboard.setInternships(internships != null ? Arrays.asList(internships) : Collections.emptyList());
        dashboard.setSkills(skills);

        return dashboard;
    }
    
   
    /**
     * Find a student by their ID.
     */
    public Optional<Student> getStudentById(Integer id) {
        return studentRepo.findById(id);
    }

    /**
     * Find a student by linked user ID.
     */
    public Optional<Student> getStudentByUserId(Integer userId) {
        return studentRepo.findByUserId(userId);
    }

    /**
     * Save a new student entity.
     */
    public Student saveStudent(Student student) {
        return studentRepo.save(student);
    }

    /**
     * Update existing student entity with new data.
     */
//    public Student updateStudent(Integer id, Student updatedStudent) {
//        Student existingStudent = studentRepo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Student not found"));
//
//        existingStudent.setStudentName(updatedStudent.getStudentName());
//        existingStudent.setGender(updatedStudent.getGender());
//        existingStudent.setUserId(updatedStudent.getUserId());
//        // Update any other student fields here if added later
//
//        return studentRepo.save(existingStudent);
//    }
    
    @Transactional
    public Student updateStudent(Integer studentId, Student updatedStudent) {
        Student existingStudent = studentRepo.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));

        // Update student details
        existingStudent.setStudentName(updatedStudent.getStudentName());
        existingStudent.setGender(updatedStudent.getGender());
        // ... update other student fields as needed
        studentRepo.save(existingStudent);

        // Update linked user entity
        User user = userRepository.findById(existingStudent.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(updatedStudent.getStudentName());
        // Do not change email, password, contact, role unless required
        userRepository.save(user);

        return existingStudent;
    }
    /**
     * Save a new education record for a student.
     */
    public Education saveEducation(Education education) {
        return educationRepo.save(education);
    }

    /**
     * Update an education record.
     */
    public Education updateEducation(Integer id, Education educationDetails) {
        Education education = educationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found"));

        education.setLevel(educationDetails.getLevel());
        education.setInstitutionName(educationDetails.getInstitutionName());
        education.setBoard(educationDetails.getBoard());
        education.setGrade(educationDetails.getGrade());
        education.setPassingYear(educationDetails.getPassingYear());

        return educationRepo.save(education);
    }

    /**
     * Delete an education record by ID.
     */
    public void deleteEducation(Integer id) {
        educationRepo.deleteById(id);
    }

    /**
     * Add a new skill to a student.
     */
    public Skill addSkillToStudent(Integer studentId, Skill skill) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        skill.setStudent(student);
        return skillRepository.save(skill);
    }

    /**
     * Update a skill record.
     */
    public Skill updateSkill(Integer skillId, Skill skillDetails) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));
        skill.setSkillName(skillDetails.getSkillName());
        return skillRepository.save(skill);
    }

    /**
     * Delete a skill record by ID.
     */
    public void deleteSkill(Integer skillId) {
        skillRepository.deleteById(skillId);
    }
    
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }
    
   
    
    
}
