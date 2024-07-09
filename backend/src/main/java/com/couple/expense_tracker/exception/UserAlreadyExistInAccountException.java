package com.couple.expense_tracker.exception;

public class UserAlreadyExistInAccountException extends RuntimeException{
    public UserAlreadyExistInAccountException(String message) {
        super(message);
    }
}