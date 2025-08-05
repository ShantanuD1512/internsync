package com.internsync.student.dto;

import java.util.List;
import com.internsync.student.entity.*;

public class DashboardDto {
    private Student student;
    private List<Education> educations;
    private List<Document> documents;
    private List<Application> applications;
    private List<InternshipDto> internships;

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
    public List<Education> getEducations() { return educations; }
    public void setEducations(List<Education> educations) { this.educations = educations; }
    public List<Document> getDocuments() { return documents; }
    public void setDocuments(List<Document> documents) { this.documents = documents; }
    public List<Application> getApplications() { return applications; }
    public void setApplications(List<Application> applications) { this.applications = applications; }
    public List<InternshipDto> getInternships() { return internships; }
    public void setInternships(List<InternshipDto> internships) { this.internships = internships; }
}
