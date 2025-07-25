package com.internsync.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.internsync.auth.dto.RegisterRequest;
import com.internsync.auth.entity.Role;
import com.internsync.auth.entity.User;
import com.internsync.auth.repository.RoleRepository;
import com.internsync.auth.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setContact(request.getContact());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Role role = roleRepository.findById(request.getRoleId()).orElseThrow();
        user.setRole(role);

        return userRepository.save(user);
    }
}