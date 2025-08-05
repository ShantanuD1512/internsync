package com.internsync.student.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.internsync.student.entity.Education;

public interface EducationRepository extends JpaRepository<Education, Integer> {
    List<Education> findByStudent_StudentId(Integer studentId);
}
