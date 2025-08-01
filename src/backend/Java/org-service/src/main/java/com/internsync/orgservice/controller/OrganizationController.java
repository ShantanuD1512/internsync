package com.internsync.orgservice.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.internsync.orgservice.dto.OrganizationDto;
import com.internsync.orgservice.service.OrganizationService;


@RestController
@RequestMapping("/api/org/organization")
public class OrganizationController {

    @Autowired
    private OrganizationService service;

    @PostMapping("/register")
    public String register(@RequestBody OrganizationDto dto) {
        service.registerOrganization(dto);
        return "Organization submitted for approval";
    }

    @PostMapping("/approve/{id}")
    public String approve(@PathVariable int id) {
        service.approveOrganization(id);
        return "Organization approved";
    }

    @GetMapping
    public Object getAll() {
        return service.getAllOrganizations();
    }
}
