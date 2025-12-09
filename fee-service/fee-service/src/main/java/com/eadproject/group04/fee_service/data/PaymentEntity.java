package com.eadproject.group04.fee_service.data;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "payments")
public class PaymentEntity{

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;

    public PaymentEntity() {
    }

    @Column(name = "student_fee_id")
    private int studentFeeId;

    @Column(name = "paid_amount")
    private double paidAmount;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "extra_note")
    private String extraNote;

    public int getPaymentId() {
        return paymentId;
    }

    public PaymentEntity(int paymentId, int studentFeeId, double paidAmount, LocalDate paymentDate, String paymentMethod, String extraNote) {
        this.paymentId = paymentId;
        this.studentFeeId = studentFeeId;
        this.paidAmount = paidAmount;
        this.paymentDate = paymentDate;
        this.paymentMethod = paymentMethod;
        this.extraNote = extraNote;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public int getStudentFeeId() {
        return studentFeeId;
    }

    public void setStudentFeeId(int studentFeeId) {
        this.studentFeeId = studentFeeId;
    }

    public double getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(double paidAmount) {
        this.paidAmount = paidAmount;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getExtraNote() {
        return extraNote;
    }

    public void setExtraNote(String extraNote) {
        this.extraNote = extraNote;
    }
}
