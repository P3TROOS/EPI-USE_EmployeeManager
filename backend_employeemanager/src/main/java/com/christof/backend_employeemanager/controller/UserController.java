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

    @PostMapping("/add")
    public String add(@RequestBody User user){
        userService.saveStudent(user);
        return "New user is added";
    }

    @GetMapping("/getAll")
    public List<User> list(){
        return userService.getAllStudents();
    }
}
