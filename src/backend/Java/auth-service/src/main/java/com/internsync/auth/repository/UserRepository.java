package com.internsync.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.internsync.auth.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
