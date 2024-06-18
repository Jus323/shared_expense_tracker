package com.couple.expense_tracker.service;

import com.couple.expense_tracker.model.ExpenseType;
import com.couple.expense_tracker.repository.ExpenseTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseTypeService {
    private ExpenseTypeRepository expenseTypeRepository;

    public List<ExpenseType> getAllExpenseType() {
        return expenseTypeRepository.findAll();
    }
}
