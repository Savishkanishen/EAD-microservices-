package com.eadproject.group04.fee_service.data;

import jakarta.persistence.*;

@Entity
@Table(name = "fee_structure")
public class FeeEntity {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "fee_name")
    private String name;

    @Column(name = "fee_grade")
    private String grade;

    public FeeEntity() {
    }

    @Column(name = "fee_amount")
    private Double amount;

    public FeeEntity(int id, String name, String grade, Double amount) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.amount = amount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public int getFeeId() {
        return id;
    }

    public void setFeeId(int feeId) {
        this.id = feeId;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String feeGrade) {
        this.grade = feeGrade;
    }

}
