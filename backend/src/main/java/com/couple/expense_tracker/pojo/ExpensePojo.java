package com.couple.expense_tracker.pojo;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.math.BigDecimal;
import java.util.Date;

public class ExpensePojo {
    private String expenseName;

    private BigDecimal expenseAmount;

    private Date expenseDate;

    private String description;

    private Long expenseTypeId;

    private Long userId;

    private Long accountId;

    public ExpensePojo() {
    }

    public ExpensePojo(String expenseName, BigDecimal expenseAmount, Date expenseDate, String description, Long expenseTypeId, Long userId, Long accountId) {
        this.expenseName = expenseName;
        this.expenseAmount = expenseAmount;
        this.expenseDate = expenseDate;
        this.description = description;
        this.expenseTypeId = expenseTypeId;
        this.userId = userId;
        this.accountId = accountId;
    }

    public String getExpenseName() {
        return expenseName;
    }

    public void setExpenseName(String expenseName) {
        this.expenseName = expenseName;
    }

    public BigDecimal getExpenseAmount() {
        return expenseAmount;
    }

    public void setExpenseAmount(BigDecimal expenseAmount) {
        this.expenseAmount = expenseAmount;
    }

    public Date getExpenseDate() {
        return expenseDate;
    }

    public void setExpenseDate(Date expenseDate) {
        this.expenseDate = expenseDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getExpenseTypeId() {
        return expenseTypeId;
    }

    public void setExpenseTypeId(Long expenseTypeId) {
        this.expenseTypeId = expenseTypeId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    @Override
    public String toString() {
        return "ExpensePojo{" +
                "expenseName='" + expenseName + '\'' +
                ", expenseAmount=" + expenseAmount +
                ", expenseDate=" + expenseDate +
                ", description='" + description + '\'' +
                ", expenseTypeId=" + expenseTypeId +
                ", userId=" + userId +
                ", accountId=" + accountId +
                '}';
    }
}
