package com.eadproject.group4.attendance_service.mapper;

import com.eadproject.group4.attendance_service.dto.AttendanceDTO;
import com.eadproject.group4.attendance_service.model.Attendance;

public class AttendanceMapper {

    public static Attendance toEntity(AttendanceDTO dto) {
        Attendance entity = new Attendance();
        entity.setId(dto.getId());
        entity.setStudentId(dto.getStudentId());
        entity.setDate(dto.getDate());
        entity.setStatus(dto.getStatus() == null ? null : Attendance.Status.valueOf(dto.getStatus().toUpperCase()));
        entity.setGrade(dto.getGrade());
        return entity;
    }

    public static AttendanceDTO toDTO(Attendance entity) {
        AttendanceDTO dto = new AttendanceDTO();
        dto.setId(entity.getId());
        dto.setStudentId(entity.getStudentId());
        dto.setDate(entity.getDate());
        dto.setStatus(entity.getStatus() == null ? null : entity.getStatus().name());
        dto.setGrade(entity.getGrade());
        return dto;
    }
}
