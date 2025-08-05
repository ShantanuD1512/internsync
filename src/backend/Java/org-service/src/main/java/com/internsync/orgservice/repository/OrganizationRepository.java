package com.internsync.orgservice.repository;

import com.internsync.orgservice.entity.Organization;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization, Integer> {
	
    Optional<Organization> findByUserId(int userId);

}
