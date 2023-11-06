package com.christof.backend_employeemanager.controller;

import com.christof.backend_employeemanager.model.User;
import com.christof.backend_employeemanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getAll")
    public List<User> userlist() {
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{employeeNumber}")
    public User getUserByEmployeeNumber(@PathVariable int employeeNumber) {
        return userService.getUserById(employeeNumber);
    }

    @GetMapping("/getManagers")
    public List<User> getManagers() {
        return userService.getAllManagers();
    }

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PutMapping("/update/{employeeNumber}")
    public User updateUser(@PathVariable int employeeNumber, @RequestBody User user) {
        user.setEmployeeNumber(employeeNumber);
        return userService.updateUser(user);
    }

    @PostMapping("/delete/{employeeNumber}")
    public void deleteUser(@PathVariable int employeeNumber) {
        System.out.println(employeeNumber);
        userService.deleteUser(employeeNumber);
    }
}
