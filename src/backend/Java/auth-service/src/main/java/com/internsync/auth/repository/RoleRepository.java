package com.internsync.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.internsync.auth.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
