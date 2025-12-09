package com.eadproject.group23.user_app.dto;

public class FeeDto {
    private String feeName;
    private double feeAmount;

    public double getFeeAmount() {
        return feeAmount;
    }

    public void setFeeAmount(double feeAmount) {
        this.feeAmount = feeAmount;
    }

    public String getFeeName() {
        return feeName;
    }

    public void setFeeName(String feeName) {
        this.feeName = feeName;
    }

    public FeeDto(String feeName, double feeAmount) {
        this.feeName = feeName;
        this.feeAmount = feeAmount;
    }
}
