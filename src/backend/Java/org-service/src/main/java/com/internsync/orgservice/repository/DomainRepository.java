package com.internsync.orgservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.internsync.orgservice.entity.Domain;

public interface DomainRepository extends JpaRepository<Domain, Integer> {

}
