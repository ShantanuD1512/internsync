package com.internsync.orgservice.controller;

import com.internsync.orgservice.dto.InternshipDto;
import com.internsync.orgservice.entity.Internship;
import com.internsync.orgservice.service.InternshipService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/org/internship")
public class InternshipController {

    @Autowired
    private InternshipService service;
    
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody InternshipDto dto) {
        try {
            String result = service.createInternship(dto);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed: " + e.getMessage());
        }
    }
    
    @GetMapping("/all/{orgId}")
    public List<Internship> getInternshipsByOrg(@PathVariable int orgId) {
        return service.getInternshipsByOrganizationId(orgId);
    }
    
    @GetMapping("/all")
    public List<Internship> getInternships() {
        return service.getAllInternships();
    }
    


}
