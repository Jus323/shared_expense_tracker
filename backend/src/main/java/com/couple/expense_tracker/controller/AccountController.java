package com.couple.expense_tracker.controller;

import com.couple.expense_tracker.model.Accounts;
import com.couple.expense_tracker.pojo.AccountPojo;
import com.couple.expense_tracker.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/{userId}")
    public ResponseEntity<Accounts> addUserAccount(@PathVariable Long userId, @RequestBody AccountPojo accountPojo) {
        try {
            Accounts addedAccount = accountService.addAccount(accountPojo, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedAccount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
