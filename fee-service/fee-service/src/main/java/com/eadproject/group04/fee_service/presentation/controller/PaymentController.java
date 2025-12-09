package com.eadproject.group04.fee_service.presentation.controller;

import com.eadproject.group04.fee_service.data.PaymentEntity;
import com.eadproject.group04.fee_service.presentation.dto.PaymentDto;
import com.eadproject.group04.fee_service.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    //get all payments
    @GetMapping
    public List<PaymentDto> getAllPayments(){
        List<PaymentEntity> paymentEntities = paymentService.getAllPayment();
        List<PaymentDto> paymentDtos = new ArrayList<>();
        for(PaymentEntity entity : paymentEntities){
            PaymentDto pd = new PaymentDto(entity.getPaymentId(), entity.getStudentFeeId(), entity.getPaidAmount(), entity.getPaymentDate(), entity.getPaymentMethod(), entity.getExtraNote());
            paymentDtos.add(pd);
        }
        return paymentDtos;
    }
    //get payment by id
    @GetMapping("/{id}")
    public PaymentDto getPaymentById(@PathVariable int id){
        PaymentEntity entity = paymentService.getPaymentById(id);
        return new PaymentDto(entity.getPaymentId(), entity.getStudentFeeId(), entity.getPaidAmount(), entity.getPaymentDate(), entity.getPaymentMethod(), entity.getExtraNote());
    }
    //get payment by student id
    @GetMapping("/students/{id}")
    public List<PaymentDto> getPaymentByStudentId(@PathVariable int id){
        List<PaymentEntity> payEntity =  paymentService.getPaymentByStudentId(id);
        List<PaymentDto> paymentDto = new ArrayList<>();
        for(PaymentEntity entity : payEntity){
            PaymentDto dto = new PaymentDto(entity.getPaymentId(), entity.getStudentFeeId(), entity.getPaidAmount(), entity.getPaymentDate(), entity.getPaymentMethod(), entity.getExtraNote());
            paymentDto.add(dto);
        }
        return paymentDto;
    }
    //add payment
    @PostMapping
    public PaymentDto addPayment(@RequestBody PaymentDto payment){
        PaymentEntity savedPayment = paymentService.addPayment(new PaymentEntity(payment.getPaymentId(), payment.getStudentFeeId(), payment.getPaidAmount(), payment.getPaymentDate(), payment.getPaymentMethod(), payment.getExtraNote()));
        return new PaymentDto(savedPayment.getPaymentId(), savedPayment.getStudentFeeId(), savedPayment.getPaidAmount(), savedPayment.getPaymentDate(), savedPayment.getPaymentMethod(), savedPayment.getExtraNote());
    }
    //update payment
    @PutMapping
    public PaymentDto updatePayment(@RequestBody PaymentDto payment){
        PaymentEntity updatedPayment = paymentService.updatePayment(new PaymentEntity(payment.getPaymentId(), payment.getStudentFeeId(), payment.getPaidAmount(), payment.getPaymentDate(), payment.getPaymentMethod(), payment.getExtraNote()));
        return new PaymentDto(updatedPayment.getPaymentId(), updatedPayment.getStudentFeeId(), updatedPayment.getPaidAmount(), updatedPayment.getPaymentDate(), updatedPayment.getPaymentMethod(), updatedPayment.getExtraNote());
    }
    //delete payment
    @DeleteMapping("/{id}")
    public String deletePayment(@PathVariable int id){
        return paymentService.deletePayment(id);
    }
    //get payment by date
    @GetMapping("/dates/{date}")
    public List<PaymentDto> getPaymentByDate(@PathVariable LocalDate date){
        List<PaymentEntity> paymentEntites = paymentService.getPaymentByDate(date);
        List<PaymentDto> paymentDtos = new ArrayList<>();
        for(PaymentEntity entity : paymentEntites){
            PaymentDto paymentDto = new PaymentDto(entity.getPaymentId(), entity.getStudentFeeId(), entity.getPaidAmount(), entity.getPaymentDate(), entity.getPaymentMethod(), entity.getExtraNote());
            paymentDtos.add(paymentDto);
        }
        return paymentDtos;
    }
}
