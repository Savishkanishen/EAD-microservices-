package com.eadproject.group04.fee_service.presentation.controller;

import com.eadproject.group04.fee_service.data.StudentFeeEntity;
import com.eadproject.group04.fee_service.presentation.dto.StudentFeeDto;
import com.eadproject.group04.fee_service.service.StudentFeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("/student-fees")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class StudentFeeController {

    @Autowired
    private StudentFeeService studentFeeService;

    @PostMapping
    public StudentFeeDto enterNewStudentFee(@RequestBody StudentFeeDto studentFeeDto){
        StudentFeeEntity savedStudentFeeEntity = studentFeeService.addStudentFee(new StudentFeeEntity(studentFeeDto.getStudentId(),
                studentFeeDto.getFeeName(),
                studentFeeDto.getFeeAmount(),
                studentFeeDto.getPaymentStatus(),
                studentFeeDto.getAssignedDate()));
        return new StudentFeeDto(savedStudentFeeEntity.getStudentFeeId(),
                savedStudentFeeEntity.getStudentId(),
                savedStudentFeeEntity.getFeeName(),
                savedStudentFeeEntity.getFeeAmount(),
                savedStudentFeeEntity.getPaymentStatus(),
                savedStudentFeeEntity.getAssignedDate());
    }

    //get a student fee
    @GetMapping
    public List<StudentFeeDto> getAllStudentFee(){
        List<StudentFeeEntity> stdEntity = studentFeeService.getAllStudentFee();
        List<StudentFeeDto> stdDto = new ArrayList<>();
        for(StudentFeeEntity entity : stdEntity){
            StudentFeeDto studentDto = new StudentFeeDto(entity.getStudentFeeId(),
                    entity.getStudentId(),
                    entity.getFeeName(),
                    entity.getFeeAmount(),
                    entity.getPaymentStatus(),
                    entity.getAssignedDate());
            stdDto.add(studentDto);
        }
        return stdDto;
    }
    //set student fee to PAID
    @PutMapping("/{id}/status/paid")
    public StudentFeeDto setStudentFeeToPaid(@PathVariable("id") int studentFeeId){
        StudentFeeEntity entity = studentFeeService.setStudentFeePaid(studentFeeId);
        return new StudentFeeDto(entity.getStudentFeeId(),
                entity.getStudentId(),
                entity.getFeeName(),
                entity.getFeeAmount(),
                entity.getPaymentStatus(),
                entity.getAssignedDate());
    }
    //delete a student fee
    @DeleteMapping("/{id}")
    public String deleteStudentFee(@PathVariable("id") int studentFeeId){
        return studentFeeService.deleteStudentFee(studentFeeId);
    }
    // get a student fee by id
    @GetMapping("/{id}")
    public StudentFeeDto getStudentFeebyId(@PathVariable("id") int studentFeeId){
        StudentFeeEntity entity = studentFeeService.getStudentFeeById(studentFeeId);
        return new StudentFeeDto(entity.getStudentFeeId(),
                entity.getStudentId(),
                entity.getFeeName(),
                entity.getFeeAmount(),
                entity.getPaymentStatus(),
                entity.getAssignedDate());
    }
    //get all students having to be paid
    @GetMapping("/status/due")
    public List<StudentFeeDto> getDueStudentFee(){
        List<StudentFeeEntity> stdEntity = studentFeeService.getAllNotPaidStudentFee();
        List<StudentFeeDto> stdDto = new ArrayList<>();
        for(StudentFeeEntity entity : stdEntity){
            StudentFeeDto studentDto = new StudentFeeDto(entity.getStudentFeeId(),
                    entity.getStudentId(),
                    entity.getFeeName(),
                    entity.getFeeAmount(),
                    entity.getPaymentStatus(),
                    entity.getAssignedDate());
            stdDto.add(studentDto);
        }
        return stdDto;
    }
    //get all students having paid
    @GetMapping("/status/paid")
    public List<StudentFeeDto> getPaidStudentFee(){
        List<StudentFeeEntity> stdEntity = studentFeeService.getAllPaidStudentFee();
        List<StudentFeeDto> stdDto = new ArrayList<>();
        for(StudentFeeEntity entity : stdEntity){
            StudentFeeDto studentDto = new StudentFeeDto(entity.getStudentFeeId(),
                    entity.getStudentId(),
                    entity.getFeeName(),
                    entity.getFeeAmount(),
                    entity.getPaymentStatus(),
                    entity.getAssignedDate());
            stdDto.add(studentDto);
        }
        return stdDto;
    }
    //get students from a specific grade to be paid
    @GetMapping("/{grade}/status/due")
    public List<StudentFeeDto> getDueStudentFeeByGrade(@PathVariable("grade") String grade){
        List<StudentFeeEntity> stdEntity = studentFeeService.getDueStudentFeesFromGrade(grade);
        List<StudentFeeDto> stdDto = new ArrayList<>();
        for(StudentFeeEntity entity : stdEntity){
            StudentFeeDto studentDto = new StudentFeeDto(entity.getStudentFeeId(),
                    entity.getStudentId(),
                    entity.getFeeName(),
                    entity.getFeeAmount(),
                    entity.getPaymentStatus(),
                    entity.getAssignedDate());
            stdDto.add(studentDto);
        }
        return stdDto;
    }
    //get students from a specific grade PAID
    @GetMapping("/{grade}/status/paid")
    public List<StudentFeeDto> getPaidStudentFeeByGrade(@PathVariable("grade") String grade){
        List<StudentFeeEntity> stdEntity = studentFeeService.getPaidStudentFeesFromGrade(grade);
        List<StudentFeeDto> stdDto = new ArrayList<>();
        for(StudentFeeEntity entity : stdEntity){
            StudentFeeDto studentDto = new StudentFeeDto(entity.getStudentFeeId(),
                    entity.getStudentId(),
                    entity.getFeeName(),
                    entity.getFeeAmount(),
                    entity.getPaymentStatus(),
                    entity.getAssignedDate());
            stdDto.add(studentDto);
        }
        return stdDto;
    }
    //get all students where fee assigned date is given date
    @GetMapping("/assigned-dates/{date}")
    public List<StudentFeeDto> getStudentFeeByAssignedDate(@PathVariable("date") LocalDate date){
        List<StudentFeeEntity> stdEntity = studentFeeService.getStudentFeeByAssignedDate(date);
        List<StudentFeeDto> stdDto = new ArrayList<>();
        for(StudentFeeEntity entity : stdEntity){
            StudentFeeDto studentDto = new StudentFeeDto(entity.getStudentFeeId(),
                    entity.getStudentId(),
                    entity.getFeeName(),
                    entity.getFeeAmount(),
                    entity.getPaymentStatus(),
                    entity.getAssignedDate());
            stdDto.add(studentDto);
        }
        return stdDto;
    }
    //get Student fee by student id
    @GetMapping("/students/{id}/fees")
    public List<StudentFeeDto> getStudentFeeByStudentId(@PathVariable("id") int studentId){
        List<StudentFeeEntity> stdEntity = studentFeeService.getStudentFeeByStudentId(studentId);
        List<StudentFeeDto> stdDto = new ArrayList<>();
        for(StudentFeeEntity entity : stdEntity){
            StudentFeeDto studentDto = new StudentFeeDto(entity.getStudentFeeId(),
                    entity.getStudentId(),
                    entity.getFeeName(),
                    entity.getFeeAmount(),
                    entity.getPaymentStatus(),
                    entity.getAssignedDate());
            stdDto.add(studentDto);
        }
        return stdDto;
    }
    //update student fee
    @PutMapping
    public StudentFeeDto updateStudentFee(@RequestBody StudentFeeDto studentFeeDto){

        StudentFeeEntity entity = studentFeeService.updateStudentFee(new StudentFeeEntity(
                studentFeeDto.getStudentId(),
                studentFeeDto.getFeeName(),
                studentFeeDto.getFeeAmount(),
                studentFeeDto.getPaymentStatus(),
                studentFeeDto.getAssignedDate()));

        return new StudentFeeDto(entity.getStudentFeeId(),
                entity.getStudentId(),
                entity.getFeeName(),
                entity.getFeeAmount(),
                entity.getPaymentStatus(),
                entity.getAssignedDate());
    }

    @GetMapping("/students/{id}/fees/paid")
    public List<StudentFeeDto> getPaidRecordByStudentId(@PathVariable("id") int studentId){
        List<StudentFeeEntity> stdEntity = studentFeeService.getPaidRecordByStudentId(studentId);
        List<StudentFeeDto> stdDto = new ArrayList<>();
        for(StudentFeeEntity entity : stdEntity){
            StudentFeeDto studentDto = new StudentFeeDto(entity.getStudentFeeId(),
                    entity.getStudentId(),
                    entity.getFeeName(),
                    entity.getFeeAmount(),
                    entity.getPaymentStatus(),
                    entity.getAssignedDate());
            stdDto.add(studentDto);
        }
        return stdDto;
    }

    @GetMapping("/students/{id}/fees/due")
    public List<StudentFeeDto> getDueRecordByStudentId(@PathVariable("id") int studentId){
        List<StudentFeeEntity> stdEntity = studentFeeService.getDueRecordByStudentId(studentId);
        List<StudentFeeDto> stdDto = new ArrayList<>();
        for(StudentFeeEntity entity : stdEntity){
            StudentFeeDto studentDto = new StudentFeeDto(entity.getStudentFeeId(),
                    entity.getStudentId(),
                    entity.getFeeName(),
                    entity.getFeeAmount(),
                    entity.getPaymentStatus(),
                    entity.getAssignedDate());
            stdDto.add(studentDto);
        }
        return stdDto;
    }

}
