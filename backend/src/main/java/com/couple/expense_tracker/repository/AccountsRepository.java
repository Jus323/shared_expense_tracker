package com.couple.expense_tracker.repository;

import com.couple.expense_tracker.model.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts, Long> {
    @Query(value = "SELECT a.* from accounts a join user_account b on a.account_id = b.account_id where b.user_id = :userId ;", nativeQuery = true)
    List<Accounts> getAccountsByUserId(@Param("userId") Long userId);
}
