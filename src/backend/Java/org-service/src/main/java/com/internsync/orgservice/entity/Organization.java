package com.internsync.orgservice.entity;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "organization_details")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "organization_id")
    private int organizationId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "registration_number")
    private String registrationNumber;

    @Column(name = "domain_id")
    private int domainId;

    @Column(name = "is_approved")
    private boolean isApproved;

    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore  // Prevents recursive or redundant serialization
    private List<Internship> internships;
    
	public Organization() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Organization(int organizationId, int userId, String orgName, String registrationNumber, int domainId,
			boolean isApproved, List<Internship> internships) {
		super();
		this.organizationId = organizationId;
		this.userId = userId;
		this.orgName = orgName;
		this.registrationNumber = registrationNumber;
		this.domainId = domainId;
		this.isApproved = isApproved;
		this.internships = internships;
	}

	public int getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(int organizationId) {
		this.organizationId = organizationId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getRegistrationNumber() {
		return registrationNumber;
	}

	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}

	public int getDomainId() {
		return domainId;
	}

	public void setDomainId(int domainId) {
		this.domainId = domainId;
	}

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}

	public List<Internship> getInternships() {
		return internships;
	}

	public void setInternships(List<Internship> internships) {
		this.internships = internships;
	}
    
    
}

