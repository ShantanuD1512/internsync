package com.internsync.student.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.internsync.student.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    List<Application> findByStudent_StudentId(Integer studentId);

    boolean existsByStudent_StudentIdAndInternshipId(Integer studentId, Integer internshipId);
}
