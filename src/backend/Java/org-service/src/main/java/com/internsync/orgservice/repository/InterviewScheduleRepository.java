package com.internsync.orgservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.internsync.orgservice.entity.InterviewSchedule;

public interface InterviewScheduleRepository extends JpaRepository<InterviewSchedule, Integer> {
    List<InterviewSchedule> findByApplicationIdIn(List<Integer> applicationIds);
}
