package com.internsync.student.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "application")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private Integer applicationId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Column(name = "internship_id")
    private Integer internshipId;

    @Column(name = "application_status_id")
    private Integer applicationStatusId;

    @Column(name = "applied_on")
    private LocalDateTime appliedOn;

    public Integer getApplicationId() { return applicationId; }
    public void setApplicationId(Integer applicationId) { this.applicationId = applicationId; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
    public Integer getInternshipId() { return internshipId; }
    public void setInternshipId(Integer internshipId) { this.internshipId = internshipId; }
    public Integer getApplicationStatusId() { return applicationStatusId; }
    public void setApplicationStatusId(Integer applicationStatusId) { this.applicationStatusId = applicationStatusId; }
    public LocalDateTime getAppliedOn() { return appliedOn; }
    public void setAppliedOn(LocalDateTime appliedOn) { this.appliedOn = appliedOn; }
}
