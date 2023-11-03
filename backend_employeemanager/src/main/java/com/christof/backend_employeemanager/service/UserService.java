package com.christof.backend_employeemanager.service;

import com.christof.backend_employeemanager.model.User;
import com.christof.backend_employeemanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public User getUserById(int employeeNumber) {
        Optional<User> user = userRepo.findById(employeeNumber);
        if (user.isPresent()) {
            return user.get();
        }
        throw new RuntimeException("Employee with employee number " + employeeNumber + " not found");
    }

    public User getUserByEmail(String email) {
//        User user = userRepo.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
        Optional<User> user = userRepo.findByEmail(email);
        if (user.isPresent()) {
            return user.get();
        }
        throw new RuntimeException("Employee with email " + email + " not found");
    }

    public void deleteUser(int employeeNumber) {
        userRepo.deleteById(employeeNumber);
    }

    public User updateUser(User user) {
        return userRepo.save(user);
    }
}
