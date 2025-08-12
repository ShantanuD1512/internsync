package com.internsync.student.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.internsync.student.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	Optional<Student> findByUserId(Integer userId);

}
