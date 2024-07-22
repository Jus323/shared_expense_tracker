package com.couple.expense_tracker.service;

import com.couple.expense_tracker.model.Users;
import com.couple.expense_tracker.pojo.LoginPojo;
import com.couple.expense_tracker.pojo.UserDetails;
import com.couple.expense_tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // Inject BCryptPasswordEncoder

    public UserDetails login(LoginPojo loginPojo) {
        // Convert email to lowercase
        String email = loginPojo.getEmail().toLowerCase();

        Optional<Users> userOptional = userService.findByEmail(email);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            // Use BCrypt to check if the password matches
            if (!passwordEncoder.matches(loginPojo.getPassword(), user.getPassword())) {
                throw new BadCredentialsException("Invalid email or password");
            } else {
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
