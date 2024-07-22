package com.couple.expense_tracker.service;

import com.couple.expense_tracker.exception.UserAlreadyExistException;
import com.couple.expense_tracker.model.Users;
import com.couple.expense_tracker.pojo.UserPojo;
import com.couple.expense_tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // Inject BCryptPasswordEncoder

    // Create a new user
    public Users createUser(UserPojo userPojo) {
        // Convert email to lowercase
        String email = userPojo.getEmail().toLowerCase();

        // Check if email exists in database
        Optional<Users> optionalUsers = userRepository.findByEmail(email);
        if (optionalUsers.isPresent()) {
            throw new UserAlreadyExistException("User email already exists.");
        }

        Users user = new Users();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(userPojo.getPassword())); // Encrypt the password
        user.setFirstName(userPojo.getFirstName());
        user.setLastName(userPojo.getLastName());

        return userRepository.save(user);
    }

    // Get all users
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<Users> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Delete all users
    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Find by email
    public Optional<Users> findByEmail(String email) {
        return userRepository.findByEmail(email.toLowerCase()); // Convert email to lowercase
    }
}
