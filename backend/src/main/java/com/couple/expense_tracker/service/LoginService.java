package com.couple.expense_tracker.service;

import com.couple.expense_tracker.model.Users;
import com.couple.expense_tracker.pojo.LoginPojo;
import com.couple.expense_tracker.pojo.UserDetails;
import com.couple.expense_tracker.repository.UserRepository;
import com.couple.expense_tracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.net.PasswordAuthentication;
import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private UserService userService;

    public UserDetails login(LoginPojo loginPojo) {
        Optional<Users> userOptional = userService.findByEmail(loginPojo.getEmail());
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            if (!user.getPassword().equals(loginPojo.getPassword())) {
                throw new BadCredentialsException("Invalid email or password");
            }
            else {
                UserDetails userDetails = new UserDetails();
                userDetails.setUserId(user.getUserId());
                userDetails.setEmail(user.getEmail());
                userDetails.setFirstName(user.getFirstName());
                userDetails.setLastName(user.getLastName());
                return userDetails;
            }
        } else {
            throw new BadCredentialsException("Invalid email or password");
        }
    }
}