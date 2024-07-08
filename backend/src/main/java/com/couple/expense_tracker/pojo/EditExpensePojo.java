package com.couple.expense_tracker.pojo;

import java.math.BigDecimal;
import java.util.Date;

public class EditExpensePojo {
    private String expenseName;

    private BigDecimal expenseAmount;

    private Date expenseDate;

    private Long expenseTypeId;

    private String description;

    private Long userId;

    public EditExpensePojo() {
    }

    public EditExpensePojo(String expenseName, BigDecimal expenseAmount, Date expenseDate, Long expenseTypeId, String description, Long userId) {
        this.expenseName = expenseName;
        this.expenseAmount = expenseAmount;
        this.expenseDate = expenseDate;
        this.expenseTypeId = expenseTypeId;
        this.description = description;
        this.userId = userId;
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

    public Long getExpenseTypeId() {
        return expenseTypeId;
    }

    public void setExpenseTypeId(Long expenseTypeId) {
        this.expenseTypeId = expenseTypeId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
