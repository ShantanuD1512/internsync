package com.internsync.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.internsync.student.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Integer> {

}
