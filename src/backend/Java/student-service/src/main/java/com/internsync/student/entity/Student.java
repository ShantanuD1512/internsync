package com.internsync.student.entity;

import jakarta.persistence.*;

@Entity
@Table(name="student_details")
public class Student {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Integer studentId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "gender")
    private String gender;

    public Integer getStudentId() { return studentId; }
    public void setStudentId(Integer studentId) { this.studentId = studentId; }
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
}
	