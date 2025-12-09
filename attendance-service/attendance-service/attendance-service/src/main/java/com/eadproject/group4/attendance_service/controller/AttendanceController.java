package com.eadproject.group4.attendance_service.controller;

import com.eadproject.group4.attendance_service.dto.AttendanceDTO;
import com.eadproject.group4.attendance_service.service.AttendanceService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping
    public List<AttendanceDTO> getAllAttendanceRecords() {
        return attendanceService.getAllAttendance();
    }

    @GetMapping("/{id}")
    public AttendanceDTO getAttendanceById(@PathVariable Long id) {
        return attendanceService.getAttendanceById(id).orElse(null);
    }

    @PostMapping
    public List<AttendanceDTO> createAttendance(@RequestBody List<AttendanceDTO> attendanceDTO) {
        return attendanceService.createAttendance(attendanceDTO);
    }

    @PutMapping("/{id}")
    public AttendanceDTO updateAttendance(@PathVariable Long id, @RequestBody AttendanceDTO attendanceDTO) {
        return attendanceService.updateAttendance(id, attendanceDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
    }

    @GetMapping("/date/{date}")
    public List<AttendanceDTO> getAttendanceByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return attendanceService.getAttendanceByDate(date);
    }

    @GetMapping("/grade/{grade}")
    public List<AttendanceDTO> getAttendanceByGrade(@PathVariable String grade) {
        return attendanceService.getAttendanceByGrade(grade);
    }

    @GetMapping("/grade/{grade}/date/{date}")
    public List<AttendanceDTO> getAttendanceByGradeAndDate(
            @PathVariable String grade,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return attendanceService.getAttendanceByGradeAndDate(grade, date);
    }

    @GetMapping("/check")
    public boolean checkAttendance(@RequestParam String grade, @RequestParam LocalDate date) {
        return attendanceService.checkAttendance(grade, date);
    }
}
