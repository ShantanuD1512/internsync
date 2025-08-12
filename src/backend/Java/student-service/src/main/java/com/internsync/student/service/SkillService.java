package com.internsync.student.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.internsync.student.entity.Skill;
import com.internsync.student.entity.Student;
import com.internsync.student.repository.SkillRepository;
import com.internsync.student.repository.StudentRepository;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<Skill> getSkillsByStudentId(Integer studentId) {
        return skillRepository.findByStudent_StudentId(studentId);
    }

    public Skill addSkillToStudent(Integer studentId, Skill skill) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        skill.setStudent(student);
        return skillRepository.save(skill);
    }

    public Skill updateSkill(Integer skillId, Skill skillDetails) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));
        skill.setSkillName(skillDetails.getSkillName());
        return skillRepository.save(skill);
    }

    public void deleteSkill(Integer skillId) {
        skillRepository.deleteById(skillId);
    }
}
