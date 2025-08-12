package com.internsync.student.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.internsync.student.entity.Skill;
import com.internsync.student.service.SkillService;

@RestController
@RequestMapping("/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    // Get all skills for a student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Skill>> getSkillsByStudent(@PathVariable Integer studentId) {
        List<Skill> skills = skillService.getSkillsByStudentId(studentId);
        return ResponseEntity.ok(skills);
    }

    // Add a new skill to a student
    @PostMapping("/student/{studentId}")
    public ResponseEntity<Skill> addSkillToStudent(@PathVariable Integer studentId, @RequestBody Skill skill) {
        Skill createdSkill = skillService.addSkillToStudent(studentId, skill);
        return ResponseEntity.ok(createdSkill);
    }

    // Update skill
    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Integer id, @RequestBody Skill skillDetails) {
        Skill updatedSkill = skillService.updateSkill(id, skillDetails);
        return ResponseEntity.ok(updatedSkill);
    }

    // Delete skill
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Integer id) {
        skillService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
}
