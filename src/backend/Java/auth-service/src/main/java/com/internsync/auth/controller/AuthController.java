package com.internsync.auth.controller;

import com.internsync.auth.dto.AuthRequest;
import com.internsync.auth.dto.LoginResponse;
import com.internsync.auth.dto.RegisterRequest;
import com.internsync.auth.entity.User;
import com.internsync.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        User user = authService.registerUser(request);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/register-student")
    public ResponseEntity<User> registerStudent(@RequestBody RegisterRequest request) {
        User user = authService.registerUserStudent(request);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/register-org")
    public ResponseEntity<Integer> registerOrgUser(@RequestBody RegisterRequest request) {
        try {
            int userId = authService.registerOrgAndReturnUserId(request);
            return ResponseEntity.ok(userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody AuthRequest request) {
        try {
            LoginResponse response = authService.loginUser(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse("Invalid credentials", 0, null, null, 0, 0));
        }
    }
}
