package com.internsync.student.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "document")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doc_id")
    private Integer docId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Column(name = "doc_type")
    private String docType;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "uploaded_on")
    private LocalDateTime uploadedOn;

    public Integer getDocId() { return docId; }
    public void setDocId(Integer docId) { this.docId = docId; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
    public String getDocType() { return docType; }
    public void setDocType(String docType) { this.docType = docType; }
    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }
    public LocalDateTime getUploadedOn() { return uploadedOn; }
    public void setUploadedOn(LocalDateTime uploadedOn) { this.uploadedOn = uploadedOn; }
}
