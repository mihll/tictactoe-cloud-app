package com.mkierzkowski.tictactoe_back.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.validation.Errors;

@AllArgsConstructor
@Getter
public class ValidationException extends RuntimeException {
    private Errors errors;
}
