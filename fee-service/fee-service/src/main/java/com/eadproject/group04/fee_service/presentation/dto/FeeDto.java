package com.eadproject.group04.fee_service.presentation.dto;

public class FeeDto {
    private int feeId;
    private String feeName;
    private String feeGrade;
    private double feeAmount;

    public FeeDto(int feeId, String feeName, String feeGrade, double feeAmount) {
        this.feeId = feeId;
        this.feeName = feeName;
        this.feeGrade = feeGrade;
        this.feeAmount = feeAmount;
    }

    public int getFeeId() {
        return feeId;
    }

    public void setFeeId(int feeId) {
        this.feeId = feeId;
    }

    public String getFeeName() {
        return feeName;
    }

    public void setFeeName(String feeName) {
        this.feeName = feeName;
    }

    public String getFeeGrade() {
        return feeGrade;
    }

    public void setFeeGrade(String feeGrade) {
        this.feeGrade = feeGrade;
    }

    public double getFeeAmount() {
        return feeAmount;
    }

    public void setFeeAmount(double feeAmount) {
        this.feeAmount = feeAmount;
    }
}
