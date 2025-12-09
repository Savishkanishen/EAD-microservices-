package com.eadproject.group23.user_app.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends
JpaRepository<UserData, Integer>{

    List<UserData> findByName(String name);

    Optional<UserData> findByNameAndPassword(String name, String password);

    List<UserData> findByGrade(String grade);

    @Query("SELECT DISTINCT u.grade FROM UserData u WHERE u.grade IS NOT NULL")
    List<String> findDistinctGrades();
}
