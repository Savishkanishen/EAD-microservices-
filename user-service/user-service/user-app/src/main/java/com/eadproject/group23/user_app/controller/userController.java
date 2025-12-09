package com.eadproject.group23.user_app.Controller;

import com.eadproject.group23.user_app.Data.UserData;
import com.eadproject.group23.user_app.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    //Get all users
    @GetMapping
    public ResponseEntity<List<UserData>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    //Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        UserData user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found with ID: " + id);
        }
    }

    // Get users by name
    @GetMapping("/user-name")
    public ResponseEntity<List<UserData>> getUserByName(@RequestParam String name) {
        return ResponseEntity.ok(userService.getUserByName(name));
    }

    //Add a new user
    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserData user) {
        if (user.getName() != null && user.getPassword() != null) {
            userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User added successfully.");
        }
        return ResponseEntity.badRequest().body("Name or password is missing.");
    }

    // Update existing user
    @PutMapping
    public ResponseEntity<String> updateUser(@RequestBody UserData user) {
        if (user.getId() == 0) {
            return ResponseEntity.badRequest().body("User ID is required for update.");
        }
        userService.updateUser(user);
        return ResponseEntity.ok("User updated successfully.");
    }

    // Delete user by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable int id) {
        boolean deleted = userService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @GetMapping("/students/grades")
    public List<Integer> getStudentsByGrade(@RequestParam String grade){
        return userService.getStudentByGrade(grade).stream().map(UserData::getId).toList();
    }

    // Login validation
    @PostMapping("/login")
    public Object validateLogin(@RequestBody Map<String, String> loginData) {
        String name = loginData.get("name").trim();
        String password = loginData.get("password").trim();

        if (name == null || password == null) {
            return "Username and password required.";
        }

        UserData user = userService.validateUser(name, password); // returns userdata or null

        if (user == null) {
            return "Invalid username or password!";
        }

        user.setPassword(null); // hide password before returning
        return user; // return user info as JSON
    }

    @GetMapping("/grades")
    public List<String> getAllGrades() {
        return userService.getAllGrades();
    }
}
