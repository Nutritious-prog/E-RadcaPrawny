package com.jpwo.legalchatbot.error.handling;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ErrorResponse {
    LocalDateTime localDateTime;
    Integer status;
    List<String> errors;
}
