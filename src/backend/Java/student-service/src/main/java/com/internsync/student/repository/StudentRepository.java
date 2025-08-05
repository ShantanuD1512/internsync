package com.internsync.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.internsync.student.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	
}
