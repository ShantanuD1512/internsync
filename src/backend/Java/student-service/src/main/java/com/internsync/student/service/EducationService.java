package com.internsync.student.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.internsync.student.entity.Education;
import com.internsync.student.repository.EducationRepository;

@Service
public class EducationService {

    @Autowired
    private EducationRepository educationRepo;

    public List<Education> getEducationByStudentId(Integer studentId) {
        return educationRepo.findByStudent_StudentId(studentId);
    }

    public Education saveEducation(Education education) {
        return educationRepo.save(education);
    }

    public Education updateEducation(Integer id, Education educationDetails) {
        Education education = educationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found"));

        education.setLevel(educationDetails.getLevel());
        education.setInstitutionName(educationDetails.getInstitutionName());
        education.setBoard(educationDetails.getBoard());
        education.setGrade(educationDetails.getGrade());
        education.setPassingYear(educationDetails.getPassingYear());

        return educationRepo.save(education);
    }

    public void deleteEducation(Integer id) {
        educationRepo.deleteById(id);
    }
}
