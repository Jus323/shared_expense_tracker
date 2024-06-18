package com.couple.expense_tracker.model;

import javax.persistence.*;
@Entity
@Table(name="accounts")
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="account_id")
    private long accountId;
    private String accountName;
    private long ownerId;

    public Accounts() {
    }

    public Accounts(long accountId, String accountName, long ownerId) {
        this.accountId = accountId;
        this.accountName = accountName;
        this.ownerId = ownerId;
    }

    public long getAccountId() {
        return accountId;
    }

    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(long ownerId) {
        this.ownerId = ownerId;
    }

    @Override
    public String toString() {
        return "Account{" +
                "accountId=" + accountId +
                ", accountName='" + accountName + '\'' +
                ", ownerId=" + ownerId +
                '}';
    }
}
