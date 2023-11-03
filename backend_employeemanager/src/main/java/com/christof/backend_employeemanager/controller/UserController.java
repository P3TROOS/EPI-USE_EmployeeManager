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

    @GetMapping("/getUser/{id}")
    public User getUserbyId(@PathVariable int id) {
        return userService.getUser(id);
    }

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User user) {
        return user;
    }

    @DeleteMapping("/delete")
    public void deleteUser(@RequestParam int id) {
        userService.deleteUser(id);
    }
}
