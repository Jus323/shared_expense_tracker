package com.couple.expense_tracker.service;

import com.couple.expense_tracker.model.UserAccount;
import com.couple.expense_tracker.model.Users;
import com.couple.expense_tracker.pojo.UserDetails;
import com.couple.expense_tracker.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserAccountService {
    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    public List<UserDetails> findUsersByAccountId(Long accountId) {
        List<UserAccount> userAccounts = userAccountRepository.findByAccountAccountId(accountId);
        System.out.println(userAccounts);
        List<Users> userList = new ArrayList<>();
        for (UserAccount userAccount : userAccounts) {
            userList.add(userAccount.getUser());
        }
        return userDetailsService.parseUserList(userList);
    }
}
