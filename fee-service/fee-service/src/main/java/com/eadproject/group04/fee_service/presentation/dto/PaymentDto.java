package com.eadproject.group04.fee_service.presentation.dto;

import java.time.LocalDate;

public class PaymentDto {

    private int paymentId;

    private int studentFeeId;

    private double paidAmount;

    private LocalDate paymentDate;

    private String paymentMethod;

    private String extraNote;

    public PaymentDto(int paymentId, int studentFeeId, double paidAmount, LocalDate paymentDate, String paymentMethod, String extraNote) {
        this.paymentId = paymentId;
        this.studentFeeId = studentFeeId;
        this.paidAmount = paidAmount;
        this.paymentDate = paymentDate;
        this.paymentMethod = paymentMethod;
        this.extraNote = extraNote;
    }

    public int getPaymentId() {
        return paymentId;
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
