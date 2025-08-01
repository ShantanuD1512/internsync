package com.internsync.orgservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.internsync.orgservice.dto.InternshipDto;
import com.internsync.orgservice.service.InternshipService;

@RestController
@RequestMapping("/api/org/internship")
public class InternshipController {

    @Autowired
    private InternshipService service;

    @PostMapping("/create")
    public String createInternship(@RequestBody InternshipDto dto) {
        return service.createInternship(dto);
    }
}
