package com.couple.expense_tracker.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class Expenses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expense_id")
    private Long expenseId;

    @Column(nullable = false)
    private String expenseName;

    @Column(nullable = false)
    private BigDecimal expenseAmount;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date expenseDate;

    @Column(nullable = false)
    private Integer dateSequence;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false)
    private Long expenseTypeId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long accountId;

    public Expenses() {
    }

    public Expenses(Long expenseId, String expenseName, BigDecimal expenseAmount, Date expenseDate, Integer dateSequence, String description, Long expenseTypeId, Long userId, Long accountId) {
        this.expenseId = expenseId;
        this.expenseName = expenseName;
        this.expenseAmount = expenseAmount;
        this.expenseDate = expenseDate;
        this.dateSequence = dateSequence;
        this.description = description;
        this.expenseTypeId = expenseTypeId;
        this.userId = userId;
        this.accountId = accountId;
    }

    public Long getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(Long expenseId) {
        this.expenseId = expenseId;
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

    public Integer getDateSequence() {
        return dateSequence;
    }

    public void setDateSequence(Integer dateSequence) {
        this.dateSequence = dateSequence;
    }

    @Override
    public String toString() {
        return "Expenses{" +
                "expenseId=" + expenseId +
                ", expenseName='" + expenseName + '\'' +
                ", expenseAmount=" + expenseAmount +
                ", expenseDate=" + expenseDate +
                ", DateSequence=" + dateSequence +
                ", description='" + description + '\'' +
                ", expenseTypeId=" + expenseTypeId +
                ", userId=" + userId +
                ", accountId=" + accountId +
                '}';
    }
}

