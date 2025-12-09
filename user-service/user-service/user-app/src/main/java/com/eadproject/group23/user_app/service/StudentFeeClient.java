package com.eadproject.group23.user_app.Service;

import com.eadproject.group23.user_app.dto.FeeDto;
import com.eadproject.group23.user_app.dto.StudentFeeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class StudentFeeClient {
    @Autowired
    private RestTemplate restTemplate;

    public StudentFeeDto enterStudentFee(StudentFeeDto studentFeeDto){
        String url = "http://localhost:8081/school-system/student-fees";

        if(studentFeeDto == null){
            return null;
        }

        // Use a different name for the response object
        StudentFeeDto response = restTemplate.postForObject(url, studentFeeDto, StudentFeeDto.class);
        return response;
    }


}
