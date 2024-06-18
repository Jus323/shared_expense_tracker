package com.couple.expense_tracker.service;

import com.couple.expense_tracker.exception.ExpenseNotFoundException;
import com.couple.expense_tracker.model.Expenses;
import com.couple.expense_tracker.pojo.ExpensePojo;
import com.couple.expense_tracker.repository.ExpensesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ExpensesService {
    @Autowired
    private ExpensesRepository expensesRepository;

    public List<Expenses> getExpensesByAccountId(Long accountId) {
        return expensesRepository.findByAccountId(accountId);
    }

    public Expenses addExpense(ExpensePojo expensePojo) {
        Expenses expenses = new Expenses();
        expenses.setExpenseAmount(expensePojo.getExpenseAmount());
        expenses.setExpenseDate(expensePojo.getExpenseDate());
        expenses.setExpenseName(expensePojo.getExpenseName());
        expenses.setExpenseTypeId(expensePojo.getExpenseTypeId());
        expenses.setDescription(expensePojo.getDescription());
        expenses.setAccountId(expensePojo.getAccountId());
        expenses.setUserId(expensePojo.getUserId());
        return expensesRepository.save(expenses);
    }

    @Transactional
    public Expenses deleteExpense(Long expenseId) {
        Expenses expense = expensesRepository.findById(expenseId)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense with ID " + expenseId + " not found"));
        expensesRepository.deleteById(expenseId);
        return expense;
    }
}
