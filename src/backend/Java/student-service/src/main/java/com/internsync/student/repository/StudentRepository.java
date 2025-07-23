package com.internsync.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.internsync.student.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

}
