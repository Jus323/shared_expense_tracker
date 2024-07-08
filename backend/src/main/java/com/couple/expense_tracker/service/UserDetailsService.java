package com.couple.expense_tracker.service;

import com.couple.expense_tracker.model.Users;
import com.couple.expense_tracker.pojo.UserDetails;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsService {
    public List<UserDetails> parseUserList(List<Users> userList) {
        List<UserDetails> userDetailsList = new ArrayList<>();
        for (Users user : userList) {
            UserDetails userDetails = new UserDetails();
            userDetails.setUserId(user.getUserId());
            userDetails.setEmail(user.getEmail());
            userDetails.setFirstName(user.getFirstName());
            userDetails.setLastName(user.getLastName());
            userDetailsList.add(userDetails);
        }
        return userDetailsList;
    }
}
