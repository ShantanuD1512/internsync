package com.internsync.orgservice.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.internsync.orgservice.dto.InternshipDto;
import com.internsync.orgservice.entity.Internship;
import com.internsync.orgservice.entity.Organization;
import com.internsync.orgservice.repository.InternshipRepository;
import com.internsync.orgservice.repository.OrganizationRepository;

@Service
public class InternshipService {

    @Autowired
    private InternshipRepository internshipRepo;

    @Autowired
    private OrganizationRepository organizationRepo;

    public String createInternship(InternshipDto dto) {
        Organization org = organizationRepo.findById(dto.getOrganizationId()).orElse(null);
        if (org == null || !org.isApproved()) {
            return "Organization not approved";
        }

        Internship internship = new Internship();
        internship.setOrganization(org);  
        internship.setCategoryId(dto.getCategoryId());
        internship.setTitle(dto.getTitle());
        internship.setDescription(dto.getDescription());
        internship.setLocation(dto.getLocation());
        internship.setDuration(dto.getDuration());
        internship.setStipend(dto.getStipend());
        internship.setMode(dto.getMode());
        internship.setDeadline(dto.getDeadline());

        internshipRepo.save(internship);
        return "Internship created";
    }
}
