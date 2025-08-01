package com.internsync.orgservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.internsync.orgservice.dto.OrganizationDto;
import com.internsync.orgservice.entity.Organization;
import com.internsync.orgservice.repository.OrganizationRepository;

@Service
public class OrganizationService {

    @Autowired
    private OrganizationRepository repo;

    public void registerOrganization(OrganizationDto dto) {
        if (repo.existsById(dto.getOrganizationId())) {
            throw new IllegalArgumentException("Organization ID already exists");
        }

        Organization org = new Organization();
        org.setOrganizationId(dto.getOrganizationId()); // manual ID
        org.setUserId(dto.getUserId());
        org.setOrgName(dto.getOrgName());
        org.setRegistrationNumber(dto.getRegistrationNumber());
        org.setDomainId(dto.getDomainId());
        org.setApproved(false);

        repo.save(org); // This will INSERT now
    }


    public void approveOrganization(int id) {
        Organization org = repo.findById(id).orElse(null);
        if (org != null) {
            org.setApproved(true);
            repo.save(org);
        }
    }

    public List<Organization> getAllOrganizations() {
        return repo.findAll();
    }
}
