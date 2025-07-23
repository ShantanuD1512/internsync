package com.internsync.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.internsync.student.model.Application;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

}
