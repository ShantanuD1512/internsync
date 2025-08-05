package com.internsync.student.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_education")
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "education_id")
    private Integer educationId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Column(name = "level")
    private String level;

    @Column(name = "institution_name")
    private String institutionName;

    @Column(name = "board")
    private String board;

    @Column(name = "grade")
    private String grade;

    @Column(name = "passing_year")
    private Integer passingYear;

    public Integer getEducationId() { return educationId; }
    public void setEducationId(Integer educationId) { this.educationId = educationId; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public String getInstitutionName() { return institutionName; }
    public void setInstitutionName(String institutionName) { this.institutionName = institutionName; }
    public String getBoard() { return board; }
    public void setBoard(String board) { this.board = board; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
    public Integer getPassingYear() { return passingYear; }
    public void setPassingYear(Integer passingYear) { this.passingYear = passingYear; }
}
