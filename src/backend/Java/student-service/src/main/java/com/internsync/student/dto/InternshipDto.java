package com.internsync.student.dto;

import java.util.Date;

public class InternshipDto {
    private int internshipId;
    private int organizationId;
    private int categoryId;
    private String title, description, location, duration, stipend, mode;
    private Date deadline;
    private String orgName;

    public int getInternshipId() {
		return internshipId;
	}
	public void setInternshipId(int internshipId) {
		this.internshipId = internshipId;
	}
	public String getOrgName() { return orgName; }
    public void setOrgName(String orgName) { this.orgName = orgName; }
	public int getOrganizationId() { return organizationId; }
    public void setOrganizationId(int organizationId) { this.organizationId = organizationId; }
    public int getCategoryId() { return categoryId; }
    public void setCategoryId(int categoryId) { this.categoryId = categoryId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getStipend() { return stipend; }
    public void setStipend(String stipend) { this.stipend = stipend; }
    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
    public Date getDeadline() { return deadline; }
    public void setDeadline(Date deadline) { this.deadline = deadline; }
}
