package com.skibidiflix.backend.dto;

public class LoginResponse {
    private String message;
    private String token;
    private boolean success;

    public LoginResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
}