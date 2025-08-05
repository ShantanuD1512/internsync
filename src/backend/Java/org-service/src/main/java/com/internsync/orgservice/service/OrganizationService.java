package com.internsync.orgservice.service;

import com.internsync.orgservice.dto.OrganizationDto;
import com.internsync.orgservice.entity.Domain;
import com.internsync.orgservice.entity.Organization;
import com.internsync.orgservice.repository.DomainRepository;
import com.internsync.orgservice.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationService {
	@Autowired
	private OrganizationRepository repo;

	@Autowired
	private DomainRepository domainRepo;

	public void registerOrganization(OrganizationDto dto) {
	    Organization org = new Organization();
	    // organizationId is auto-generated, don’t set it manually
	    org.setUserId(dto.getUserId());
	    org.setOrgName(dto.getOrgName());
	    org.setRegistrationNumber(dto.getRegistrationNumber());
	    org.setDomainId(dto.getDomainId());
	    org.setApproved(false);

	    repo.save(org);
	}


	public void approveOrganization(int id) {
	    Organization org = repo.findById(id).orElse(null);
	    if (org != null) {
	        org.setApproved(true);
	        try {
	            repo.save(org);
	        } catch (Exception e) {
	            throw new RuntimeException("Error saving organization: " + e.getMessage());
	        }

	    }
	}

	public List<Organization> getAllOrganizations() {
	    return repo.findAll();
	}

	public List<Domain> getAllDomains() {
	    return domainRepo.findAll();
	}

	public int getOrganizationIdByUserId(int userId) {
	    Organization organization = repo.findByUserId(userId)
	        .orElseThrow(() -> new RuntimeException("Organization not found"));
	    return organization.getOrganizationId();
	}
	
	public void updateOrganization(OrganizationDto dto) {
	    Organization org = repo.findById(dto.getOrganizationId())
	            .orElseThrow(() -> new RuntimeException("Organization not found"));

	    org.setOrgName(dto.getOrgName());
	    org.setRegistrationNumber(dto.getRegistrationNumber());
	    org.setDomainId(dto.getDomainId());

	    repo.save(org);
	}


	
}
