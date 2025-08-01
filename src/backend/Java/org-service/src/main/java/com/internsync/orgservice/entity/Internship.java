package com.internsync.orgservice.entity;

import jakarta.persistence.*;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "internship")
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "internship_id")
    private int internshipId;

    @ManyToOne
    @JoinColumn(name = "organization_id", referencedColumnName = "organization_id")
    @JsonBackReference
    private Organization organization;

    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "location")
    private String location;

    @Column(name = "duration")
    private String duration;

    @Column(name = "stipend")
    private String stipend;

    @Column(name = "mode")
    private String mode;

    @Column(name = "deadline")
    private Date deadline;

	public Internship() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Internship(Organization organization, int categoryId, String title, String description,
			String location, String duration, String stipend, String mode, Date deadline) {
		super();
		this.organization = organization;
		this.categoryId = categoryId;
		this.title = title;
		this.description = description;
		this.location = location;
		this.duration = duration;
		this.stipend = stipend;
		this.mode = mode;
		this.deadline = deadline;
	}


	public int getInternshipId() {
		return internshipId;
	}

	public void setInternshipId(int internshipId) {
		this.internshipId = internshipId;
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getStipend() {
		return stipend;
	}

	public void setStipend(String stipend) {
		this.stipend = stipend;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}   
    
}
