package com.christof.backend_employeemanager.service;

import com.christof.backend_employeemanager.model.User;
import java.util.List;

public interface UserService {
    public List<User> getAllUsers();
    public User addUser(User user);
    public User getUserById(int employeeNumber);
    public List<User> getAllManagers();
    public void deleteUser(int employeeNumber);
    public User updateUser(User user);
}
