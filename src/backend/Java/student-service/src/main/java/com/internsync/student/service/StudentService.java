package com.internsync.student.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.internsync.student.entity.*;
import com.internsync.student.repository.*;
import com.internsync.student.dto.*;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepo;
    @Autowired
    private EducationRepository educationRepo;
    @Autowired
    private DocumentRepository documentRepo;
    @Autowired
    private ApplicationRepository applicationRepo;

    private RestTemplate restTemplate = new RestTemplate();

    public DashboardDto getStudentDashboard(Integer studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<Education> educations = educationRepo.findByStudent_StudentId(studentId);
        List<Document> documents = documentRepo.findByStudent_StudentId(studentId);
        List<Application> applications = applicationRepo.findByStudent_StudentId(studentId);

        String url = "http://localhost:8082/api/org/internship/all"; // Change this if org-service is moved
        InternshipDto[] internships = restTemplate.getForObject(url, InternshipDto[].class);

        DashboardDto dashboard = new DashboardDto();
        dashboard.setStudent(student);
        dashboard.setEducations(educations);
        dashboard.setDocuments(documents);
        dashboard.setApplications(applications);
        dashboard.setInternships(internships != null ? Arrays.asList(internships) : Collections.emptyList());

        return dashboard;
    }

    public Optional<Student> getStudentById(Integer id) {
        return studentRepo.findById(id);
    }

    public Student saveStudent(Student student) {
        return studentRepo.save(student);
    }

    public Student updateStudent(Integer id, Student updatedStudent) {
        Student existingStudent = studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        existingStudent.setStudentName(updatedStudent.getStudentName());
        existingStudent.setGender(updatedStudent.getGender());
        existingStudent.setUserId(updatedStudent.getUserId());
        // Update any other fields if needed

        return studentRepo.save(existingStudent);
    }
    
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }
}
