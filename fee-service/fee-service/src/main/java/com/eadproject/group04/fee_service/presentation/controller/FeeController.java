package com.eadproject.group04.fee_service.presentation.controller;

import com.eadproject.group04.fee_service.data.FeeEntity;
import com.eadproject.group04.fee_service.presentation.dto.FeeDto;
import com.eadproject.group04.fee_service.service.FeeService;
import com.eadproject.group04.fee_service.service.StudentFeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/fees")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class FeeController {

    @Autowired
    private FeeService feeService;
    @Autowired
    private StudentFeeService studentFeeService;

    @GetMapping("/names")
    public List<FeeDto> getFeeByName(@RequestParam String name){
        List<FeeEntity> feeEntity = feeService.getFeeByName(name);
        List<FeeDto> feeDto = new ArrayList<>();
        for(FeeEntity fee : feeEntity){
            FeeDto dto = new FeeDto(fee.getFeeId(), fee.getName(),fee.getGrade(),fee.getAmount());
            feeDto.add(dto);
        }
        return feeDto;
    }

    @GetMapping("/grades")
    public List<FeeDto> getFeeByGrade(@RequestParam String grade){
        List<FeeEntity> feeEntities = feeService.getFeeByGrade(grade);
        List<FeeDto> feeDto = new ArrayList<>();
        for(FeeEntity fee : feeEntities){
            FeeDto dto = new FeeDto(fee.getFeeId(), fee.getName(),fee.getGrade(),fee.getAmount());
            feeDto.add(dto);

        }
        return feeDto;
    }

    @GetMapping
    public List<FeeDto> getAllFees(){
        List<FeeEntity> feeEntities = feeService.getAllFee();
        List<FeeDto> feeDto = new ArrayList<>();
        for(FeeEntity fee : feeEntities){
            FeeDto dto = new FeeDto(fee.getFeeId(), fee.getName(),fee.getGrade(),fee.getAmount());
            feeDto.add(dto);

        }
        return feeDto;
    }

    @GetMapping("/{id}")
    public FeeDto getFeeById(@PathVariable int id) {
        FeeEntity feeEntity = feeService.getFeeById(id);
        return new FeeDto(feeEntity.getFeeId(), feeEntity.getName(), feeEntity.getGrade(), feeEntity.getAmount());
    }

    //add fee
    @PostMapping
    public FeeDto addNewFee(@RequestBody FeeDto feeDto){
        FeeEntity feeEntity = new FeeEntity(feeDto.getFeeId(),feeDto.getFeeName(),feeDto.getFeeGrade(),feeDto.getFeeAmount());
        FeeEntity savedFee = feeService.enterFee(feeEntity);
        return new FeeDto(savedFee.getFeeId(), savedFee.getName(), savedFee.getGrade(), savedFee.getAmount());
    }
    //update fee
    @PutMapping
    public FeeDto updateFee(@RequestBody FeeDto feeDto){
        FeeEntity feeEntity = feeService.updateFee(new FeeEntity(feeDto.getFeeId(), feeDto.getFeeName(), feeDto.getFeeGrade(), feeDto.getFeeAmount()));
        return new FeeDto(feeEntity.getFeeId(), feeEntity.getName(), feeEntity.getGrade(), feeEntity.getAmount());
    }

    //delete fee
    @DeleteMapping("/{id}")
    public String deleteFee(@PathVariable int id){
        return feeService.deleteFee(id);
    }
}

