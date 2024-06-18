package com.couple.expense_tracker.repository;

import com.couple.expense_tracker.model.Expenses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpensesRepository extends JpaRepository<Expenses, Long> {
    List<Expenses> findByAccountId(Long accountId);
}
