package com.internsync.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.internsync.student.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Integer> {

}
