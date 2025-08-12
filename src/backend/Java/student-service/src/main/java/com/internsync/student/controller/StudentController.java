package com.internsync.student.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.internsync.student.dto.DashboardDto;
import com.internsync.student.entity.Education;
import com.internsync.student.entity.Skill;
import com.internsync.student.entity.Student;
import com.internsync.student.repository.EducationRepository;
import com.internsync.student.repository.SkillRepository;
import com.internsync.student.repository.StudentRepository;
import com.internsync.student.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;
    
    @Autowired
    private StudentRepository studentRepo;
    
    @Autowired
    private EducationRepository educationRepo;
    
    @Autowired
    private SkillRepository skillRepository;
    

 // In your StudentController.java
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<Student> getByUserId(@PathVariable Integer userId) {
        Student student = studentRepo.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        return ResponseEntity.ok(student);
    }

    
    @GetMapping("/{id}/dashboard")
    public ResponseEntity<DashboardDto> getStudentDashboard(@PathVariable Integer id) {
        DashboardDto dashboard = studentService.getStudentDashboard(id);
        return ResponseEntity.ok(dashboard);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Integer id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Integer id, @RequestBody Student updatedStudent) {
        try {
            return ResponseEntity.ok(studentService.updateStudent(id, updatedStudent));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        Student saved = studentService.saveStudent(student);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/{studentId}/education")
    public ResponseEntity<Education> addEducationForStudent(
        @PathVariable Integer studentId,
        @RequestBody Education education
    ) {
        Student student = studentRepo.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        education.setStudent(student);
        Education saved = educationRepo.save(education);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/{studentId}/skills")
    public ResponseEntity<Skill> addSkillForStudent(
        @PathVariable Integer studentId,
        @RequestBody Skill skill
    ) {
        Student student = studentRepo.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        skill.setStudent(student);
        Skill saved = skillRepository.save(skill);
        return ResponseEntity.ok(saved);
    }
    
    @GetMapping("/allstudents")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }
}
