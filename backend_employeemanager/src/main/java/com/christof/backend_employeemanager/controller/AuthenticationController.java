//package com.christof.backend_employeemanager.controller;
//
//import com.fragile.infosafe.primary.auth.AuthenticationRequest;
//import com.fragile.infosafe.primary.auth.AuthenticationResponse;
//import com.fragile.infosafe.primary.auth.AuthenticationService;
//import com.fragile.infosafe.primary.config.JwtService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api")
//@RequiredArgsConstructor
//@CrossOrigin
//@Slf4j
//public class AuthenticationController {
//    @PostMapping("/login")
//    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
//        AuthenticationResponse response = service.authenticate(request);
//        if(response.getError()){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        }
//        return ResponseEntity.ok(response);
//    }
//}
