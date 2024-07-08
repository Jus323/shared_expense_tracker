package com.couple.expense_tracker.controller;

import com.couple.expense_tracker.exception.ExpenseNotFoundException;
import com.couple.expense_tracker.model.Expenses;
import com.couple.expense_tracker.pojo.EditExpensePojo;
import com.couple.expense_tracker.pojo.ExpensePojo;
import com.couple.expense_tracker.service.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@CrossOrigin
public class ExpenseController {
    @Autowired
    private ExpensesService expensesService;

    @GetMapping("/{accountId}")
    public List<Expenses> getExpensesByAccountId(@PathVariable Long accountId, @RequestParam(name = "month") Integer month, @RequestParam(name = "year") Integer year) {
        return expensesService.getExpensesByAccountIdMonthYear(accountId, month, year);
    }

    @GetMapping
    public Expenses getExpenseById(@RequestParam(name = "expenseId") Long expenseId) {
        return expensesService.getExpensesById(expenseId);
    }

    @PostMapping
    public ResponseEntity<Expenses> newExpense(@RequestBody ExpensePojo expensePojo) {
        Expenses createdExpense = expensesService.addExpense(expensePojo);
        if (createdExpense == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createdExpense);
    }

    @PutMapping
    public ResponseEntity<Expenses> updateExpense(@RequestParam(name = "expenseId") Long expenseId, @RequestBody EditExpensePojo editExpensePojo    ) {
        try {
            Expenses updatedExpense = expensesService.updateExpense(expenseId, editExpensePojo);
            return ResponseEntity.ok(updatedExpense);
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long expenseId) {
        try {
            Expenses deletedExpense = expensesService.deleteExpense(expenseId);
            return ResponseEntity.ok("Expense with ID " + expenseId + " deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete expense: " + e.getMessage());
        }
    }

}
