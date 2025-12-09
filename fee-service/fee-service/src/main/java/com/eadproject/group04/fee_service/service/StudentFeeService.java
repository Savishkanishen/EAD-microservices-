package com.eadproject.group04.fee_service.service;

import com.eadproject.group04.fee_service.data.StudentFeeEntity;
import com.eadproject.group04.fee_service.data.StudentFeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class StudentFeeService {

    @Autowired
    private StudentFeeRepository studentFeeRepository;

    @Autowired
    private StudentServiceClient studentServiceClient;

    //enter a student fee
    public StudentFeeEntity addStudentFee(StudentFeeEntity studentFeeEntity){
        return studentFeeRepository.save(studentFeeEntity);
    }
    //get a student fee
    public List<StudentFeeEntity> getAllStudentFee(){
        return studentFeeRepository.findAll();
    }
    //update a student fee
    public StudentFeeEntity udpdateStudentFee(StudentFeeEntity studentFeeEntity){
        return studentFeeRepository.save(studentFeeEntity);
    }
    //set student fee to PAID
    public StudentFeeEntity setStudentFeePaid(int id){
        int status = studentFeeRepository.setStudentFeeToPaid(id);
        if(status > 0){
            return studentFeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Could Not Get The Updated Student Fee"));
        }
        else{
            throw new RuntimeException("Could Not Update the Fee Status");
        }
    }
    //delete a student fee
    public String deleteStudentFee(int id){
        if(!studentFeeRepository.existsById(id)){
            throw new RuntimeException("Student Fee Not Found with Id : "+id);
        }
        else{
            studentFeeRepository.deleteById(id);
            return "Student Fee Deleted Successfully";
        }
    }
    // get a student fee by id
    public StudentFeeEntity getStudentFeeById(int id){
        return studentFeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Could Not Find Record With Id: "+id));
    }
    //get all students having to be paid
    public List<StudentFeeEntity> getAllNotPaidStudentFee(){
        return studentFeeRepository.getAllNotPaid();
    }
    //get all students having paid
    public List<StudentFeeEntity> getAllPaidStudentFee(){
        return studentFeeRepository.getAllPaidRecords();
    }
    //get students from a specific grade to be paid
    public List<StudentFeeEntity> getDueStudentFeesFromGrade(String grade){
        List<Integer> studentIds = studentServiceClient.getStudentIdByGrades(grade);
        return studentFeeRepository.getAllDueForGrade(studentIds);
    }
    //get students from a specific grade PAID
    public List<StudentFeeEntity> getPaidStudentFeesFromGrade(String grade){
        List<Integer> studentIds = studentServiceClient.getStudentIdByGrades(grade);
        return studentFeeRepository.getAllPaidRecordsForGrade(studentIds);
    }
    //get all students where fee assigned date is given date
    public List<StudentFeeEntity> getStudentFeeByAssignedDate(LocalDate date){
        return studentFeeRepository.findByAssignedDate(date);
    }
    //get Student fee by student id
    public List<StudentFeeEntity> getStudentFeeByStudentId(int id){
        return studentFeeRepository.findByStudentId(id);
    }
    //update student fee
    public StudentFeeEntity updateStudentFee(StudentFeeEntity studentFeeEntity){
        return studentFeeRepository.save(studentFeeEntity);
    }

    public List<StudentFeeEntity> getPaidRecordByStudentId(int id){
        return studentFeeRepository.getPaidRecordsByStudentId(id);
    }

    public List<StudentFeeEntity> getDueRecordByStudentId(int id){
        return studentFeeRepository.getDueRecordsByStudentId(id);
    }


}
