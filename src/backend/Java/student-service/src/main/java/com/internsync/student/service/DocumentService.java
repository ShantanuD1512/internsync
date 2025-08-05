package com.internsync.student.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.internsync.student.entity.Document;
import com.internsync.student.entity.Student;
import com.internsync.student.repository.DocumentRepository;
import com.internsync.student.repository.StudentRepository;

@Service
public class DocumentService {
    @Autowired
    private DocumentRepository documentRepo;
    @Autowired
    private StudentRepository studentRepo;

    public Document upload(Document document) {
        if(document.getStudent() == null || document.getStudent().getStudentId() == null) 
            throw new RuntimeException("Student must not be null");
        Student student = studentRepo.findById(document.getStudent().getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        document.setStudent(student);
        document.setUploadedOn(LocalDateTime.now());
        return documentRepo.save(document);
    }

    public List<Document> getDocumentsByStudentId(Integer studentId) {
        return documentRepo.findByStudent_StudentId(studentId);
    }

    public Document updateDocument(Integer docId, Document docDetails) {
        Document doc = documentRepo.findById(docId)
                .orElseThrow(() -> new RuntimeException("Document not found"));
        doc.setDocType(docDetails.getDocType());
        doc.setFilePath(docDetails.getFilePath());
        return documentRepo.save(doc);
    }

    public void deleteDocument(Integer docId) {
        documentRepo.deleteById(docId);
    }
}

