package com.couple.expense_tracker.controller;

import com.couple.expense_tracker.model.Users;
import com.couple.expense_tracker.pojo.ApiResponse;
import com.couple.expense_tracker.pojo.LoginPojo;
import com.couple.expense_tracker.pojo.UserDetails;
import com.couple.expense_tracker.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<Optional<UserDetails>> login(@RequestBody LoginPojo loginPojo) {
        try {
            UserDetails userDetails = loginService.login(loginPojo);
            return ResponseEntity.ok().body(Optional.ofNullable(userDetails));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Optional.empty());
        }
    }
}