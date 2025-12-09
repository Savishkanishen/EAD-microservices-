package com.eadproject.group04.fee_service.data;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "student_fee")
public class StudentFeeEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentFeeId;

    @Column(name = "student_id")
    private int studentId;

    @Column(name = "fee_name")
    private String feeName;

    @Column(name = "fee_amount")
    private double feeAmount;

    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "assigned_date")
    private LocalDate assignedDate;

    public StudentFeeEntity() {
    }

    public StudentFeeEntity(int studentId, String feeName, double feeAmount, String paymentStatus, LocalDate assignedDate) {
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
