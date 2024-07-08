package com.couple.expense_tracker.controller;

import com.couple.expense_tracker.pojo.UserDetails;
import com.couple.expense_tracker.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/accountusers")
public class UserAccountController {
    @Autowired
    private UserAccountService userAccountService;

    @GetMapping("/{accountId}")
    public ResponseEntity<List<UserDetails>> findUsersByAccountId(@PathVariable Long accountId) {
        List<UserDetails> users = userAccountService.findUsersByAccountId(accountId);
        return ResponseEntity.ok(users);
    }
}
