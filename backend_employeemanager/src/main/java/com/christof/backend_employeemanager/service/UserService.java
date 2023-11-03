package com.christof.backend_employeemanager.service;

import com.christof.backend_employeemanager.model.User;
import com.christof.backend_employeemanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    @Autowired
    private final UserRepository userRepo;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User addUser(User user) {
        return userRepo.save(user);
    }

    public User getUser(int employeeNumber) {
        Optional<User> user = userRepo.findById(employeeNumber);
        if (user.isPresent()) {
            return user.get();
        }
        throw new RuntimeException("Employee with mployee number " + employeeNumber + " not found");
    }

    public void deleteUser(int employeeNumber) {
        userRepo.deleteById(employeeNumber);
    }

    public User updateUser(User user) {
        return userRepo.save(user);
    }
}
