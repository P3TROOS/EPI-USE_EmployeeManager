package com.christof.backend_employeemanager.service;

import com.christof.backend_employeemanager.model.User;

import java.util.List;

public interface UserService {
    public User saveStudent(User user);
    public List<User> getAllStudents();
}
