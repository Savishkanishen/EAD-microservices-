package com.eadproject.group23.user_app.Data;

import jakarta.persistence.*;

@Entity(name = "UserData")
@Table(name="user")
public class UserData {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    public UserData() {
    }

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;

    @Column(name = "grade")
    private String grade;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public UserData(int id, String name, String email, String password, String role, String grade) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.grade=grade;
    }

    public String getName() {
        return name;
    }





}
