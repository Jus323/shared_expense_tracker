package com.couple.expense_tracker.service;

import com.couple.expense_tracker.model.Accounts;
import com.couple.expense_tracker.pojo.AccountPojo;
import com.couple.expense_tracker.repository.AccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    @Autowired
    private AccountsRepository accountsRepository;

    @Autowired UserAccountService userAccountService;

    public List<Accounts> getAccountsByUserId(Long userId) {
        return accountsRepository.getAccountsByUserId(userId);
    }

    public Accounts addAccount(AccountPojo accountPojo, Long userId) {
        Accounts account = new Accounts();
        account.setAccountName(accountPojo.getAccountName());
        account.setOwnerId(userId);
        Accounts savedAccount = accountsRepository.save(account);
        userAccountService.addUserToNewAccount(userId, savedAccount.getAccountId());
        return savedAccount;
    }
}
