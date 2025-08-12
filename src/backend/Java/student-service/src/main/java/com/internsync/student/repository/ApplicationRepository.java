package com.internsync.student.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import com.internsync.student.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    List<Application> findByStudent_StudentId(Integer studentId);
    boolean existsByStudent_StudentIdAndInternshipId(Integer studentId, Integer internshipId);
    
    List<Application> findByInternshipId(Integer internshipId);
    List<Application> findByInternshipIdIn(List<Integer> internshipIds);
    List<Application> findByInternshipIdInAndApplicationStatusId(List<Integer> internshipIds, Integer applicationStatusId);
    
    @Query(value = """
    	    SELECT a.application_id AS applicationId,
    	           a.applied_on AS appliedOn,
    	           a.student_id AS studentId,
    	           s.student_name AS studentName,
    	           a.internship_id AS internshipId,
    	           i.title AS internshipTitle
    	    FROM application a
    	    JOIN internship i ON a.internship_id = i.internship_id
    	    JOIN student_details s ON a.student_id = s.student_id
    	    WHERE a.internship_id IN (:internshipIds)
    	    """, nativeQuery = true)
    	List<Map<String, Object>> getApplicationsWithInternshipTitle(@Param("internshipIds") List<Integer> internshipIds);

}
