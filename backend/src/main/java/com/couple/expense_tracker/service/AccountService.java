package com.couple.expense_tracker.service;

import com.couple.expense_tracker.model.Accounts;
import com.couple.expense_tracker.repository.AccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    @Autowired
    private AccountsRepository accountsRepository;

    public List<Accounts> getAccountsByUserId(Long userId) {
        return accountsRepository.getAccountsByUserId(userId);
    }
}
