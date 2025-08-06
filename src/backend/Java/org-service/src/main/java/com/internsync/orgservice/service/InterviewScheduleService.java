package com.internsync.orgservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.internsync.orgservice.entity.InterviewSchedule;
import com.internsync.orgservice.repository.InterviewScheduleRepository;

@Service
public class InterviewScheduleService {

    @Autowired
    private InterviewScheduleRepository repo;

    public List<InterviewSchedule> getByApplicationIds(List<Integer> applicationIds) {
        if (applicationIds == null || applicationIds.isEmpty()) {
            return List.of();
        }
        return repo.findByApplicationIdIn(applicationIds);
    }

    public InterviewSchedule createInterview(InterviewSchedule interview) {
        return repo.save(interview);
    }

    public InterviewSchedule updateInterview(Integer id, InterviewSchedule details) {
        Optional<InterviewSchedule> opt = repo.findById(id);
        if (opt.isPresent()) {
            InterviewSchedule existing = opt.get();
            existing.setInterviewDateTime(details.getInterviewDateTime());
            existing.setMode(details.getMode());
            existing.setInstructions(details.getInstructions());
            existing.setInterviewStatusId(details.getInterviewStatusId());
            return repo.save(existing);
        }
        throw new RuntimeException("Interview schedule not found");
    }

    public InterviewSchedule updateStatus(Integer id, Integer statusId) {
        Optional<InterviewSchedule> opt = repo.findById(id);
        if (opt.isPresent()) {
            InterviewSchedule existing = opt.get();
            existing.setInterviewStatusId(statusId);
            return repo.save(existing);
        }
        throw new RuntimeException("Interview schedule not found");
    }

    public void deleteInterview(Integer id) {
        repo.deleteById(id);
    }
}
