package com.mkierzkowski.tictactoe_back.exception;

import org.springframework.http.HttpStatus;

public interface WithMessageAuthenticationException {
    String getMessage();

    HttpStatus getHttpStatusCode();
}