package com.eadproject.group23.user_app.Service;

import com.eadproject.group23.user_app.dto.FeeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class FeeClient {
    @Autowired
    private RestTemplate restTemplate;

    public List<FeeDto> getStudentFeeByGrades(String grade){
        String url = "http://localhost:8081/school-system/fees/grades?grade=" +grade;

        FeeDto[] feeDtos = restTemplate.getForObject(url, FeeDto[].class);

        if(feeDtos == null){
            return new ArrayList<>();
        }
        return Arrays.asList(feeDtos);
    }
}
