package com.couple.expense_tracker.service;


import com.couple.expense_tracker.model.Users;
import com.couple.expense_tracker.pojo.UserPojo;
import com.couple.expense_tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Create a new user
    public Users createUser(UserPojo userPojo) {
        Users user = new Users();
        user.setEmail(userPojo.getEmail());
        user.setPassword(userPojo.getPassword());
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

    //find by email
    public Optional<Users> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
