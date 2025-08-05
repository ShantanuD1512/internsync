package com.internsync.orgservice.repository;

import com.internsync.orgservice.entity.Internship;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InternshipRepository extends JpaRepository<Internship, Integer> {
	
	List<Internship> findByOrganizationOrganizationId(int organizationId);

}
