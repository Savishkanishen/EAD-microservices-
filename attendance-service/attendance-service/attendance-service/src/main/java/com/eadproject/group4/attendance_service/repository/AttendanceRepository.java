package com.eadproject.group4.attendance_service.repository;

import com.eadproject.group4.attendance_service.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByDate(LocalDate date);
    List<Attendance> findByGrade(String grade);
    List<Attendance> findByGradeAndDate(String grade, LocalDate date);
    boolean existsByGradeAndDate(String grade, LocalDate date);
}
