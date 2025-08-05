package com.internsync.student.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.internsync.student.entity.Application;
import com.internsync.student.service.ApplicationService;

@RestController
@RequestMapping("/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<Application> applyForInternship(@RequestParam Integer studentId, @RequestParam Integer internshipId) {
        Application savedApp = applicationService.apply(studentId, internshipId);
        return ResponseEntity.ok(savedApp);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Application>> getApplicationsForStudent(@PathVariable Integer studentId) {
        List<Application> apps = applicationService.getApplicationsForStudent(studentId);
        return ResponseEntity.ok(apps);
    }
}
