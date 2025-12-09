package com.eadproject.group04.fee_service.presentation.dto;

import java.time.LocalDate;

public class StudentFeeDto {

    private int studentFeeId;

    private int studentId;

    private String feeName;

    private double feeAmount;

    private String paymentStatus;

    private LocalDate assignedDate;

    public StudentFeeDto(int studentFeeId, int studentId, String feeName, double feeAmount, String paymentStatus, LocalDate assignedDate) {
        this.studentFeeId = studentFeeId;
        this.studentId = studentId;
        this.feeName = feeName;
        this.feeAmount = feeAmount;
        this.paymentStatus = paymentStatus;
        this.assignedDate = assignedDate;
    }

    public int getStudentFeeId() {
        return studentFeeId;
    }

    public void setStudentFeeId(int studentFeeId) {
        this.studentFeeId = studentFeeId;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getFeeName() {
        return feeName;
    }

    public void setFeeName(String feeName) {
        this.feeName = feeName;
    }

    public double getFeeAmount() {
        return feeAmount;
    }

    public void setFeeAmount(double feeAmount) {
        this.feeAmount = feeAmount;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public LocalDate getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(LocalDate assignedDate) {
        this.assignedDate = assignedDate;
    }
}
