package com.couple.expense_tracker.service;

import com.couple.expense_tracker.exception.AccountNotFoundException;
import com.couple.expense_tracker.exception.EmailNotFoundException;
import com.couple.expense_tracker.exception.ResourceNotFoundException;
import com.couple.expense_tracker.exception.UserAlreadyExistInAccountException;
import com.couple.expense_tracker.model.Accounts;
import com.couple.expense_tracker.model.UserAccount;
import com.couple.expense_tracker.model.Users;
import com.couple.expense_tracker.pojo.UserDetails;
import com.couple.expense_tracker.repository.AccountsRepository;
import com.couple.expense_tracker.repository.UserAccountRepository;
import com.couple.expense_tracker.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserAccountService {
    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountsRepository accountsRepository;

    public List<UserDetails> findUsersByAccountId(Long accountId) {
        List<UserAccount> userAccounts = userAccountRepository.findByAccountAccountId(accountId);
        System.out.println(userAccounts);
        List<Users> userList = new ArrayList<>();
        for (UserAccount userAccount : userAccounts) {
            userList.add(userAccount.getUser());
        }
        return userDetailsService.parseUserList(userList);
    }

    public String addUserAccountByEmail(String email, Long accountId) {
        // Check if email exists
        Optional<Users> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            throw new EmailNotFoundException("Email not found");
        }

        Users user = optionalUser.get();

        // Check if already in account
        if (!userAccountRepository.findByAccountAccountIdAndUserEmail(accountId, email).isEmpty()) {
            throw new UserAlreadyExistInAccountException("User already exists in account");
        }

        // Check if account exists
        Optional<Accounts> optionalAccount = accountsRepository.findById(accountId);
        if (optionalAccount.isEmpty()) {
            throw new AccountNotFoundException("Account not found");
        }

        Accounts account = optionalAccount.get();

        // Create and save UserAccount
        UserAccount userAccount = new UserAccount();
        userAccount.setUser(user);
        userAccount.setAccount(account);
        userAccountRepository.save(userAccount);

        return "User added";
    }

    public UserAccount addUserToNewAccount(Long userId, Long accountId) {
        // Retrieve user and account from the repositories
        Optional<Users> userOptional = userRepository.findById(userId);
        Optional<Accounts> accountOptional = accountsRepository.findById(accountId);

        // Check if user and account are present
        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        if (accountOptional.isEmpty()) {
            throw new ResourceNotFoundException("Account not found with id: " + accountId);
        }

        // Extract the user and account from Optional
        Users user = userOptional.get();
        Accounts account = accountOptional.get();

        // Create a new UserAccount instance
        UserAccount userAccount = new UserAccount(user, account);

        // Save the UserAccount to the repository (assuming you have a repository for UserAccount)
        return userAccountRepository.save(userAccount);
    }

}
