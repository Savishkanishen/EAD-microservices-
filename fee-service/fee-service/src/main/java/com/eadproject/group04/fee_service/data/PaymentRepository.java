package com.eadproject.group04.fee_service.data;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer>{
    List<PaymentEntity> findAllByStudentFeeId(int id);
    List<PaymentEntity> findAllByPaymentDate(LocalDate date);
}
