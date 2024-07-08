package com.couple.expense_tracker.repository;

import com.couple.expense_tracker.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    List<UserAccount> findByAccountAccountId(Long accountId);
}
