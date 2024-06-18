package com.couple.expense_tracker.model;

import javax.persistence.*;

@Entity
public class ExpenseType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long expenseTypeId;

    @Column(nullable = false)
    private String expenseTypeName;

    public ExpenseType() {
    }

    public ExpenseType(Long expenseTypeId, String expenseTypeName) {
        this.expenseTypeId = expenseTypeId;
        this.expenseTypeName = expenseTypeName;
    }

    public Long getExpenseTypeId() {
        return expenseTypeId;
    }

    public void setExpenseTypeId(Long expenseTypeId) {
        this.expenseTypeId = expenseTypeId;
    }

    @Override
    public String toString() {
        return "ExpenseType{" +
                "expenseTypeId=" + expenseTypeId +
                ", expenseTypeName='" + expenseTypeName + '\'' +
                '}';
    }
}
