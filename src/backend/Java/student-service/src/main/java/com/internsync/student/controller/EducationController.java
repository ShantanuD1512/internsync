package com.internsync.student.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.internsync.student.entity.Education;
import com.internsync.student.service.EducationService;

@RestController
@RequestMapping("/educations")
public class EducationController {

    @Autowired
    private EducationService educationService;

    // Retrieve all education records for a given student by ID
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Education>> getEducationsByStudentId(@PathVariable Integer studentId) {
        List<Education> educations = educationService.getEducationByStudentId(studentId);
        return ResponseEntity.ok(educations);
    }

    // Create new education record
    @PostMapping
    public ResponseEntity<Education> createEducation(@RequestBody Education education) {
        Education createdEducation = educationService.saveEducation(education);
        return ResponseEntity.ok(createdEducation);
    }

    // Update an existing education record
    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(@PathVariable Integer id, @RequestBody Education educationDetails) {
        Education updatedEducation = educationService.updateEducation(id, educationDetails);
        return ResponseEntity.ok(updatedEducation);
    }

    // Delete education record
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Integer id) {
        educationService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }
}
