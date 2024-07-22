package com.couple.expense_tracker.pojo;

public class AccountPojo {
    private String accountName;
    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public AccountPojo() {
    }

    public AccountPojo(String accountName, long ownerId) {
        this.accountName = accountName;
    }
}
