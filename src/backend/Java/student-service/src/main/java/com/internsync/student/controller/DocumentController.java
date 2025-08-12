package com.internsync.student.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.internsync.student.entity.Document;
import com.internsync.student.entity.Student;
import com.internsync.student.service.DocumentService;
import com.internsync.student.repository.StudentRepository;

@RestController
@RequestMapping("/documents")
public class DocumentController {

    private static final String UPLOAD_DIR = "uploads"; 

    @Autowired
    private DocumentService documentService;

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("studentId") Integer studentId,
            @RequestParam("docType") String docType) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        // Retrieve the student entity
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        try {
            // Ensure the upload directory exists
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate a unique filename to avoid collisions
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
            }
            String uniqueFileName = UUID.randomUUID().toString() + extension;

            // Save the file locally
            Path filePath = uploadPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath);

            // Create a new Document entity and save metadata to DB
            Document document = new Document();
            document.setStudent(student);
            document.setDocType(docType);
            document.setFilePath(filePath.toString()); // Store relative or absolute path as needed
            document.setUploadedOn(LocalDateTime.now());

            Document savedDoc = documentService.upload(document);
            return ResponseEntity.ok(savedDoc);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
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
