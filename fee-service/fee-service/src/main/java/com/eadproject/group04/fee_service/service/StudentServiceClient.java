package com.eadproject.group04.fee_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class StudentServiceClient {

    @Autowired
    private RestTemplate restTemplate;

    public List<Integer> getStudentIdByGrades(String grade){
        String url = "http://localhost:8080/school-system/users/students/grades?grade=" +grade;

        Integer[] studentIds = restTemplate.getForObject(url, Integer[].class);

        if(studentIds == null){
            return new ArrayList<>();
        }
        return Arrays.asList(studentIds);
    }
}
