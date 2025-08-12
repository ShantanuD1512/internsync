package com.internsync.orgservice.entity;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "application") // or actual table name
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private Integer applicationId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "internship_id")
    private Internship internship;

    @Column(name = "application_status_id")
    private Integer applicationStatusId;

    @Column(name = "applied_on")
    private LocalDateTime appliedOn;

	public Integer getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(Integer applicationId) {
		this.applicationId = applicationId;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Internship getInternship() {
		return internship;
	}

	public void setInternship(Internship internship) {
		this.internship = internship;
	}

	public Integer getApplicationStatusId() {
		return applicationStatusId;
	}

	public void setApplicationStatusId(Integer applicationStatusId) {
		this.applicationStatusId = applicationStatusId;
	}

	public LocalDateTime getAppliedOn() {
		return appliedOn;
	}

	public void setAppliedOn(LocalDateTime appliedOn) {
		this.appliedOn = appliedOn;
	}
    
    	

}
