package com.couple.expense_tracker.controller;

import com.couple.expense_tracker.model.Expenses;
import com.couple.expense_tracker.pojo.ExpensePojo;
import com.couple.expense_tracker.service.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/expenses")
public class ExpenseController {
    @Autowired
    private ExpensesService expensesService;

    @GetMapping("/{accountId}")
    public List<Expenses> getExpensesByAccountId(@PathVariable Long accountId) {
        return expensesService.getExpensesByAccountId(accountId);
    }
    @PostMapping
    public ResponseEntity<Expenses> newExpense(@RequestBody ExpensePojo expensePojo) {
        Expenses createdExpense = expensesService.addExpense(expensePojo);
        if (createdExpense == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createdExpense);
    }
}
