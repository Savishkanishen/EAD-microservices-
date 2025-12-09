package com.eadproject.group04.fee_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeeRepository extends JpaRepository<FeeEntity, Integer> {
    List<FeeEntity> findByGrade(String grade);
    List<FeeEntity> findByName(String name);
}
