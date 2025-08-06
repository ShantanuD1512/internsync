package com.internsync.student.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.internsync.student.entity.Application;
import com.internsync.student.service.ApplicationService;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyForInternship(@RequestParam Integer studentId, @RequestParam Integer internshipId) {
        try {
            Application savedApp = applicationService.apply(studentId, internshipId);
            return ResponseEntity.ok(savedApp);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Application>> getApplicationsForStudent(@PathVariable Integer studentId) {
        List<Application> apps = applicationService.getApplicationsForStudent(studentId);
        return ResponseEntity.ok(apps);
    }
    
    @GetMapping("/internship/{internshipId}")
    public ResponseEntity<List<Application>> getApplicationsForInternship(@PathVariable Integer internshipId) {
        List<Application> apps = applicationService.getApplicationsForInternship(internshipId);
        return ResponseEntity.ok(apps);
    }

    @GetMapping("/internships")
    public ResponseEntity<List<Application>> getApplicationsByInternshipIds(
            @RequestParam List<Integer> internshipIds,
            @RequestParam(required = false) Integer statusFilter) {
        
        List<Application> apps;
        if (statusFilter != null) {
            apps = applicationService.getApplicationsForInternshipsAndStatus(internshipIds, statusFilter);
        } else {
            apps = applicationService.getApplicationsForInternships(internshipIds);
        }
        return ResponseEntity.ok(apps);
    }

    
}
