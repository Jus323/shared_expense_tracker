package com.couple.expense_tracker.controller;

import com.couple.expense_tracker.exception.AccountNotFoundException;
import com.couple.expense_tracker.exception.EmailNotFoundException;
import com.couple.expense_tracker.exception.UserAlreadyExistInAccountException;
import com.couple.expense_tracker.pojo.UserDetails;
import com.couple.expense_tracker.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/{accountId}")
    public ResponseEntity<String> addUserAccount(@PathVariable Long accountId, @RequestParam String email) {
        try {
            System.out.println("Received accountId: " + accountId);
            System.out.println("Received email: " + email);
            userAccountService.addUserAccountByEmail(email, accountId);
            return ResponseEntity.ok("User added to account successfully");
        } catch (EmailNotFoundException e) {
            System.err.println("EmailNotFoundException: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        } catch (UserAlreadyExistInAccountException e) {
            System.err.println("UserAlreadyExistInAccountException: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists in account");
        } catch (AccountNotFoundException e) {
            System.err.println("AccountNotFoundException: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

}
