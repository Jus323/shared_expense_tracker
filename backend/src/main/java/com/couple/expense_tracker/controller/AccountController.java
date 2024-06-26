package com.couple.expense_tracker.controller;

import com.couple.expense_tracker.model.Accounts;
import com.couple.expense_tracker.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/{userId}")
    public List<Accounts> getUserAccounts(@PathVariable Long userId) {
        return accountService.getAccountsByUserId(userId);
    }
}
