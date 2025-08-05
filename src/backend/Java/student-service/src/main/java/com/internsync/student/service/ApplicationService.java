package com.internsync.student.service;
import java.time.LocalDateTime;
import java.util.List;
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
}
