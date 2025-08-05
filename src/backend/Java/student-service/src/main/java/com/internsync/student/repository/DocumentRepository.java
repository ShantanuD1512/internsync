package com.internsync.student.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.internsync.student.entity.Document;

public interface DocumentRepository extends JpaRepository<Document, Integer> {
    List<Document> findByStudent_StudentId(Integer studentId);
}
