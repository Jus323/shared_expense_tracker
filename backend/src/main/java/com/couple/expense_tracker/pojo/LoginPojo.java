package com.couple.expense_tracker.pojo;

public class LoginPojo {
    private String password;
    private String email;

    public LoginPojo() {
    }

    public LoginPojo(String password, String email) {
        this.password = password;
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "LoginPojo{" +
                "password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
