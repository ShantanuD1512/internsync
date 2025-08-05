package com.internsync.student.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.internsync.student.entity.Document;
import com.internsync.student.service.DocumentService;

@RestController
@RequestMapping("/documents")
public class DocumentController {
    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(@RequestBody Document document) {
        Document savedDoc = documentService.upload(document);
        return ResponseEntity.ok(savedDoc);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Document>> getDocumentsByStudentId(@PathVariable Integer studentId) {
        List<Document> docs = documentService.getDocumentsByStudentId(studentId);
        return ResponseEntity.ok(docs);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Document> updateDocument(@PathVariable Integer id, @RequestBody Document docDetails) {
        Document updatedDoc = documentService.updateDocument(id, docDetails);
        return ResponseEntity.ok(updatedDoc);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Integer id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }
}
