package com.couple.expense_tracker.repository;

import com.couple.expense_tracker.model.ExpenseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseTypeRepository extends JpaRepository<ExpenseType, Long> {
}
