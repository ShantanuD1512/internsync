package com.internsync.student.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.internsync.student.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Integer> {
    List<Skill> findByStudent_StudentId(Integer studentId);
}
