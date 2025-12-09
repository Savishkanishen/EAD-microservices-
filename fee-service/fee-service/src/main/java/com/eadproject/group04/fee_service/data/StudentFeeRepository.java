package com.eadproject.group04.fee_service.data;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StudentFeeRepository extends JpaRepository<StudentFeeEntity, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE StudentFeeEntity s SET s.paymentStatus = 'PAID' WHERE s.studentFeeId = :studentFeeId")
    int setStudentFeeToPaid(@Param("studentFeeId") int studentFeeId);

    @Query("SELECT s FROM StudentFeeEntity s Where s.paymentStatus = 'DUE' ")
    List<StudentFeeEntity> getAllNotPaid();

    @Query("SELECT s FROM StudentFeeEntity s Where s.paymentStatus = 'PAID' ")
    List<StudentFeeEntity> getAllPaidRecords();

    @Query("SELECT s FROM StudentFeeEntity s Where s.paymentStatus = 'PAID' AND s.studentId IN :studentIds")
    List<StudentFeeEntity> getAllPaidRecordsForGrade(@Param("studentIds") List<Integer> studentIds);

    @Query("SELECT s FROM StudentFeeEntity s Where s.paymentStatus = 'DUE' AND s.studentId IN :studentIds")
    List<StudentFeeEntity> getAllDueForGrade(@Param("studentIds") List<Integer> studentIds);

    @Query("SELECT s FROM StudentFeeEntity s Where s.paymentStatus = 'DUE' AND s.studentId = :studentId")
    List<StudentFeeEntity> getDueRecordsByStudentId(@Param("studentId") int studentId);

    @Query("SELECT s FROM StudentFeeEntity s Where s.paymentStatus = 'PAID' AND s.studentId = :studentId")
    List<StudentFeeEntity> getPaidRecordsByStudentId(@Param("studentId") int studentId);

    List<StudentFeeEntity> findByAssignedDate(LocalDate assignedDate);
    List<StudentFeeEntity> findByStudentId(int id);



}
