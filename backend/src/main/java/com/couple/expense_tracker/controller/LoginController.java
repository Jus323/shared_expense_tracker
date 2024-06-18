package com.couple.expense_tracker.controller;

import com.couple.expense_tracker.model.Users;
import com.couple.expense_tracker.pojo.ApiResponse;
import com.couple.expense_tracker.pojo.LoginPojo;
import com.couple.expense_tracker.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginPojo loginPojo) {
        try {
            loginService.login(loginPojo);
            // Login successful
            ApiResponse response = new ApiResponse("success", "Login successful");
            return ResponseEntity.ok().body(response);
        } catch (BadCredentialsException e) {
            // Incorrect password
            ApiResponse response = new ApiResponse("error", "Incorrect password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (EntityNotFoundException e) {
            // User not found
            String errorMessage = "User not found for email: " + loginPojo.getEmail();
            ApiResponse response = new ApiResponse("error", errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
