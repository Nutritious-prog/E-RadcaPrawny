package com.jpwo.legalchatbot.model;

import lombok.Data;

@Data
public class ApiResponse<T> {

    private boolean success;
    private T response;
    private String message;


    public ApiResponse(boolean success, T response, String message) {
        this.success = success;
        this.response = response;
        this.message = message;
    }

    public ApiResponse(boolean success, T response) {
        this.success = success;
        this.response = response;
    }


}
