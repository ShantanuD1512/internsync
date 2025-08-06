package com.internsync.orgservice.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "interview_schedule")
public class InterviewSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Integer scheduleId;

    @Column(name = "application_id")
    private Integer applicationId;

    @Column(name = "interview_datetime")
    private LocalDateTime interviewDateTime;

    @Column(name = "mode")
    private String mode;

    @Column(name = "instructions")
    private String instructions;

    @Column(name = "interview_status_id")
    private Integer interviewStatusId;

    public Integer getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Integer scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Integer getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Integer applicationId) {
        this.applicationId = applicationId;
    }

    public LocalDateTime getInterviewDateTime() {
        return interviewDateTime;
    }

    public void setInterviewDateTime(LocalDateTime interviewDateTime) {
        this.interviewDateTime = interviewDateTime;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public Integer getInterviewStatusId() {
        return interviewStatusId;
    }

    public void setInterviewStatusId(Integer interviewStatusId) {
        this.interviewStatusId = interviewStatusId;
    }
}
