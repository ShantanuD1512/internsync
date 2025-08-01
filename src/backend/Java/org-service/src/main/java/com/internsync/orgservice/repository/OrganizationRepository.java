package com.internsync.orgservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.internsync.orgservice.entity.Organization;

public interface OrganizationRepository extends JpaRepository<Organization, Integer> {

}

