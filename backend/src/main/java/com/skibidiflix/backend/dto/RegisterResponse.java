package com.skibidiflix.backend.dto;

public class RegisterResponse {

    private boolean success;
    private String message;

    public RegisterResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // getters (importante se for Spring)
    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }
}