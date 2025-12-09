package com.eadproject.group23.user_app.Service;

import com.eadproject.group23.user_app.Data.UserRepository;
import com.eadproject.group23.user_app.Data.UserData;
import com.eadproject.group23.user_app.dto.FeeDto;
import com.eadproject.group23.user_app.dto.StudentFeeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private FeeClient feeClient;

    @Autowired
    private StudentFeeClient studentFeeClient;

    public List<UserData> getAllUsers() {
        return userRepo.findAll();
    }

    public UserData getUserById(int id) {
        return userRepo.findById(id).orElse(null);
    }

    public UserData createUser(UserData user) {

        UserData savedUser = userRepo.save(user);
        if(user.getRole().equals("student")) {
            List<FeeDto> feeDtos = feeClient.getStudentFeeByGrades(user.getGrade());
            for(FeeDto dto : feeDtos){
                StudentFeeDto studentFeeDto = new StudentFeeDto(savedUser.getId(), dto.getFeeName(), dto.getFeeAmount(), "DUE", LocalDate.now());
                studentFeeClient.enterStudentFee(studentFeeDto);
            }
        }
        return savedUser;
    }

    public UserData updateUser(UserData user) {
        return userRepo.save(user);
    }

    public List<UserData> getUserByName(String name) {
        return userRepo.findByName(name);
    }

    public boolean deleteUser(int id) {
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);
            return true;
        }
        return false;
    }

    public UserData validateUser(String name, String password) {
        return userRepo.findByNameAndPassword(name, password).orElseThrow(() -> new RuntimeException("Invalid User data"));
    }

    public List<UserData> getStudentByGrade(String grade){
        return userRepo.findByGrade(grade);
    }

    public List<String> getAllGrades() {
        return userRepo.findDistinctGrades();
    }
}
