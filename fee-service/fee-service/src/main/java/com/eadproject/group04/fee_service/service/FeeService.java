package com.eadproject.group04.fee_service.service;

import com.eadproject.group04.fee_service.data.FeeEntity;
import com.eadproject.group04.fee_service.data.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FeeService {

    @Autowired
    private FeeRepository feeRepository;
    @Autowired
    private StudentServiceClient studentServiceClient;
    @Autowired
    private StudentFeeService studentFeeService;
    //input a fee
    @Transactional
    public FeeEntity enterFee(FeeEntity feeEntityAdd){
        List<Integer> studentsIds = studentServiceClient.getStudentIdByGrades(feeEntityAdd.getGrade());
        for(int id : studentsIds){
            StudentFeeEntity stdFeeEntity = new StudentFeeEntity(id, feeEntityAdd.getName(), feeEntityAdd.getAmount(), "DUE", LocalDate.now());
            studentFeeService.addStudentFee(stdFeeEntity);
        }
        return feeRepository.save(feeEntityAdd);
    }
    //update a fee
    public FeeEntity updateFee(FeeEntity feeEntityUpdate){
        return feeRepository.save(feeEntityUpdate);
    }
    //delete a fee
    public String deleteFee(int feeId){
        if(!feeRepository.existsById(feeId)){
            throw new RuntimeException("Fee Id "+feeId+" was not found");
        } else {
            feeRepository.deleteById(feeId);
            return "fee deleted successful";
        }
    }
    //get fee by id
    public FeeEntity getFeeById(int feeId){
        return feeRepository.findById(feeId).orElseThrow(() -> new RuntimeException("Fee not Found with the fee Id "+feeId));
    }
    //get all fee
    public List<FeeEntity> getAllFee(){
        return feeRepository.findAll();
    }
    //get a fee by grade
    public List<FeeEntity> getFeeByGrade(String grade){
        return feeRepository.findByGrade(grade);
    }
    //get fee by name
    public List<FeeEntity> getFeeByName(String name){
        return feeRepository.findByName(name);
    }


}
