package com.internsync.auth.service;

import com.internsync.auth.dto.AuthRequest;
import com.internsync.auth.dto.LoginResponse;
import com.internsync.auth.dto.RegisterRequest;
import com.internsync.auth.entity.Role;
import com.internsync.auth.entity.User;
import com.internsync.auth.repository.RoleRepository;
import com.internsync.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User registerUser(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setContact(request.getContact());
        user.setPassword(request.getPassword());

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);
        return userRepository.save(user);
    }

    public int registerOrgAndReturnUserId(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setContact(request.getContact());

        Role orgRole = roleRepository.findById(3) // Assuming role_id 3 = organization
                .orElseThrow(() -> new RuntimeException("Organization role not found"));
        user.setRole(orgRole);

        user = userRepository.save(user);
        return user.getUserId();
    }

    public LoginResponse loginUser(AuthRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();

        if (!request.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        int organizationId = 0;

        // If user is organization (role_id = 3), fetch organizationId via org-service
        if (user.getRole().getRoleId() == 3) {
            RestTemplate restTemplate = new RestTemplate();
            String url = "http://localhost:8082/api/org/user/" + user.getUserId();

            try {
                ResponseEntity<Integer> response = restTemplate.getForEntity(url, Integer.class);
                if (response.getStatusCode() == HttpStatus.OK) {
                    organizationId = response.getBody();
                }
            } catch (Exception e) {
                System.out.println("Failed to fetch organizationId: " + e.getMessage());
            }
        }

        return new LoginResponse(
                "Login successful",
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getRole().getRoleId(),
                organizationId
        );
    }
}
