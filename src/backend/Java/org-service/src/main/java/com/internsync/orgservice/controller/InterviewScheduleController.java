package com.internsync.orgservice.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.internsync.orgservice.entity.InterviewSchedule;
import com.internsync.orgservice.service.InterviewScheduleService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/org/interviews")
public class InterviewScheduleController {

    @Autowired
    private InterviewScheduleService service;

    @GetMapping
    public ResponseEntity<List<InterviewSchedule>> getByApplicationIds(
        @RequestParam(required = false) List<Integer> applicationIds) {

        if (applicationIds == null || applicationIds.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<InterviewSchedule> interviews = service.getByApplicationIds(applicationIds);
        return ResponseEntity.ok(interviews);
    }

    @PostMapping
    public ResponseEntity<InterviewSchedule> createInterview(@RequestBody InterviewSchedule interview) {
        InterviewSchedule created = service.createInterview(interview);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterviewSchedule> updateInterview(@PathVariable Integer id, @RequestBody InterviewSchedule interviewDetails) {
        InterviewSchedule updated = service.updateInterview(id, interviewDetails);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<InterviewSchedule> updateStatus(@PathVariable Integer id, @RequestBody Map<String, Integer> statusMap) {
        Integer statusId = statusMap.get("interviewStatusId");
        InterviewSchedule updated = service.updateStatus(id, statusId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable Integer id) {
        service.deleteInterview(id);
        return ResponseEntity.noContent().build();
    }
}
