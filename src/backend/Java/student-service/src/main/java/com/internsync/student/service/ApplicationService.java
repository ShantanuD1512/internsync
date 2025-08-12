package com.internsync.student.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.internsync.student.entity.Application;
import com.internsync.student.entity.Student;
import com.internsync.student.repository.ApplicationRepository;
import com.internsync.student.repository.StudentRepository;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepo;

    @Autowired
    private StudentRepository studentRepo;

    public Application apply(Integer studentId, Integer internshipId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        boolean alreadyApplied = applicationRepo.existsByStudent_StudentIdAndInternshipId(studentId, internshipId);
        if (alreadyApplied) {
            throw new RuntimeException("You have already applied to this internship.");
        }

        Application app = new Application();
        app.setStudent(student);
        app.setInternshipId(internshipId);
        app.setApplicationStatusId(1); 
        app.setAppliedOn(LocalDateTime.now());

        return applicationRepo.save(app);
    }

    public List<Application> getApplicationsForStudent(Integer studentId) {
        return applicationRepo.findByStudent_StudentId(studentId);
    }
    
    public List<Application> getApplicationsForInternship(Integer internshipId) {
        return applicationRepo.findByInternshipId(internshipId);
    }

    // New method for multiple internship IDs
    public List<Application> getApplicationsForInternships(List<Integer> internshipIds) {
        return applicationRepo.findByInternshipIdIn(internshipIds);
    }
    public List<Application> getApplicationsForInternshipsAndStatus(List<Integer> internshipIds, Integer statusId) {
        return applicationRepo.findByInternshipIdInAndApplicationStatusId(internshipIds, statusId);
    }
    public List<Map<String, Object>> getApplicationsWithInternshipTitle(List<Integer> internshipIds) {
        return applicationRepo.getApplicationsWithInternshipTitle(internshipIds);
    }

}
