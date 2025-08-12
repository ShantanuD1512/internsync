package com.internsync.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.internsync.student.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}