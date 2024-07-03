package com.couple.expense_tracker.controller;

import com.couple.expense_tracker.model.ExpenseType;
import com.couple.expense_tracker.service.ExpenseTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/expensetype")
@CrossOrigin
public class ExpenseTypeController {
    @Autowired
    private ExpenseTypeService expenseTypeService;
    @GetMapping
    public List<ExpenseType> getAlLExpenseTypes() {
        return expenseTypeService.getAllExpenseType();
    }
}
