package com.internsync.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.internsync.student.model.InterviewSchedule;

public interface InterviewScheduleRepository extends JpaRepository<InterviewSchedule, Integer> {

}
