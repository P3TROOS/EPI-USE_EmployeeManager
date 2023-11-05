package com.christof.backend_employeemanager.service;

import com.christof.backend_employeemanager.model.User;
import com.christof.backend_employeemanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User addUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public User getUserById(int employeeNumber) {
        Optional<User> user = userRepo.findById(employeeNumber);
        if (user.isPresent()) {
            return user.get();
        }
        throw new RuntimeException("Employee with employee number " + employeeNumber + " not found");
    }

    @Override
    public List<User> getAllManagers() {
        return userRepo.findManagers();
    }

    @Override
    public void deleteUser(int employeeNumber) {
        userRepo.deleteById(employeeNumber);
    }

    @Override
    public User updateUser(User user) {
        return userRepo.save(user);
    }
}
