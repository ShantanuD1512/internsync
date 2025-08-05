package com.internsync.orgservice.controller;

import com.internsync.orgservice.dto.OrganizationDto;
import com.internsync.orgservice.entity.Domain;
import com.internsync.orgservice.service.OrganizationService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/org/")
public class OrganizationController {

	@Autowired
	private OrganizationService service;

	@PostMapping("/organization")
	public ResponseEntity<?> register(@RequestBody OrganizationDto dto) {
	    try {
	        service.registerOrganization(dto);
	        return ResponseEntity.ok("Organization submitted for approval");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Registration failed: " + e.getMessage());
	    }
	}


	@PostMapping("/organization/approve/{id}")
	public String approve(@PathVariable int id) {
	    service.approveOrganization(id);
	    return "Organization approved";
	}

	@GetMapping("/organization")
	public List<?> getAllOrganizations() {
	    return service.getAllOrganizations();
	}

	@GetMapping("/domains")
	public List<Domain> getAllDomains() {
	    return service.getAllDomains();
	}

	@GetMapping("/user/{userId}")
    public ResponseEntity<Integer> getOrganizationIdByUserId(@PathVariable int userId) {
        int orgId = service.getOrganizationIdByUserId(userId);
        return ResponseEntity.ok(orgId);
    }
	
	@PutMapping("/organization/update")
	public ResponseEntity<?> updateOrganization(@RequestBody OrganizationDto dto) {
	    try {
	        service.updateOrganization(dto);
	        return ResponseEntity.ok("Organization updated successfully");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Update failed: " + e.getMessage());
	    }
	}

	
}
