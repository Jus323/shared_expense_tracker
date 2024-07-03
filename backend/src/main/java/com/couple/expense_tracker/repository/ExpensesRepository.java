package com.couple.expense_tracker.repository;

import com.couple.expense_tracker.model.Expenses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ExpensesRepository extends JpaRepository<Expenses, Long> {
    List<Expenses> findByAccountId(Long accountId);
    @Query(value = "select * from expenses where account_id = :accountId and extract(month from expense_date) = :month and extract(year from expense_date) = :year order by expense_date desc, date_sequence desc ;", nativeQuery = true)
    List<Expenses> findByAccountIdMonthYear(@Param("accountId") Long accountId, @Param("month") Integer month, @Param("year") Integer year);

    @Query(value = "SELECT COALESCE(MAX(date_sequence) + 1, 1) from expenses where account_id = :accountId and expense_date = :expenseDate ;", nativeQuery = true)
    Integer getNextDateSequence(@Param("accountId") Long accountId, @Param("expenseDate") Date expenseDate);
}
