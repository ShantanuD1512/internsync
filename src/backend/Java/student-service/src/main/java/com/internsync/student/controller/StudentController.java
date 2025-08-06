package com.internsync.student.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.internsync.student.dto.DashboardDto;
import com.internsync.student.entity.Student;
import com.internsync.student.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/{id}/dashboard")
    public ResponseEntity<DashboardDto> getDashboard(@PathVariable Integer id) {
        DashboardDto dashboard = studentService.getStudentDashboard(id);
        return ResponseEntity.ok(dashboard);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Integer id, @RequestBody Student updatedStudent) {
        try {
            return ResponseEntity.ok(studentService.updateStudent(id, updatedStudent));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
