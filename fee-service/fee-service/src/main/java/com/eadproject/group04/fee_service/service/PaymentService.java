package com.eadproject.group04.fee_service.service;

import com.eadproject.group04.fee_service.data.PaymentEntity;
import com.eadproject.group04.fee_service.data.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private StudentFeeService studentFeeService;
    //add payment
    public PaymentEntity addPayment(PaymentEntity payment){
        studentFeeService.setStudentFeePaid(payment.getStudentFeeId());
        return paymentRepository.save(payment);
    }
    //get all payments
    public List<PaymentEntity> getAllPayment(){
        return paymentRepository.findAll();
    }
    //get payment by id
    public PaymentEntity getPaymentById(int id){
        return paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("No Payment found by id: "+id));
    }
    //get payment by student id
    public List<PaymentEntity> getPaymentByStudentId(int id){
        return paymentRepository.findAllByStudentFeeId(id);
    }
    //update payment
    public PaymentEntity updatePayment(PaymentEntity payment){
        return paymentRepository.save(payment);
    }
    //delete payment
    public String deletePayment(int id){
        if(!paymentRepository.existsById(id)){
            throw new RuntimeException("Couldn't Delete Fee with id "+id);
        }
        else{
            paymentRepository.deleteById(id);
            return "Payment Deleted Successful!";
        }
    }
    //get payment by date
    public List<PaymentEntity> getPaymentByDate(LocalDate date){
        return paymentRepository.findAllByPaymentDate(date);
    }
}
