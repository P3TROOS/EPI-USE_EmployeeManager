package com.christof.backend_employeemanager.controller;

import com.christof.backend_employeemanager.model.User;
import com.christof.backend_employeemanager.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/getAll")
    public List<User> userlist() {
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{employeeNumber}")
    public User getUserByEmployeeNumber(@PathVariable int employeeNumber) {
        return userService.getUser(employeeNumber);
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

    @DeleteMapping("/delete")
    public void deleteUser(@RequestParam int employeeNumber) {
        userService.deleteUser(employeeNumber);
    }
}
