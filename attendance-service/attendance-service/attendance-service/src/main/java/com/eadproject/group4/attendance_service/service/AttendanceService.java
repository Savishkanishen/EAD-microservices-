package com.eadproject.group4.attendance_service.service;

import com.eadproject.group4.attendance_service.dto.AttendanceDTO;
import com.eadproject.group4.attendance_service.mapper.AttendanceMapper;
import com.eadproject.group4.attendance_service.model.Attendance;
import com.eadproject.group4.attendance_service.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public List<AttendanceDTO> getAllAttendance() {
        return attendanceRepository.findAll()
                .stream()
                .map(AttendanceMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<AttendanceDTO> getAttendanceById(Long id) {
        return attendanceRepository.findById(id).map(AttendanceMapper::toDTO);
    }

    public List<AttendanceDTO> createAttendance(List<AttendanceDTO> attendanceDTO) {
        List<AttendanceDTO> savedDto = new ArrayList<>();
        for(AttendanceDTO dto : attendanceDTO){
            Attendance saved = attendanceRepository.save(AttendanceMapper.toEntity(dto));
            savedDto.add(AttendanceMapper.toDTO(saved));
        }
        return savedDto;
    }

    public AttendanceDTO updateAttendance(Long id, AttendanceDTO attendanceDTO) {
        Attendance entity = AttendanceMapper.toEntity(attendanceDTO);
        entity.setId(id);
        Attendance updated = attendanceRepository.save(entity);
        return AttendanceMapper.toDTO(updated);
    }

    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }

    public List<AttendanceDTO> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDate(date)
                .stream()
                .map(AttendanceMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<AttendanceDTO> getAttendanceByGrade(String grade) {
        return attendanceRepository.findByGrade(grade)
                .stream()
                .map(AttendanceMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<AttendanceDTO> getAttendanceByGradeAndDate(String grade, LocalDate date) {
        return attendanceRepository.findByGradeAndDate(grade, date)
                .stream()
                .map(AttendanceMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Boolean checkAttendance(String grade, LocalDate date){
        return attendanceRepository.existsByGradeAndDate(grade, date);
    }
}
