package com.mkierzkowski.tictactoe_back.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mkierzkowski.tictactoe_back.exception.ExceptionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class ResponseWriter {
    @Autowired
    ObjectMapper objectMapper;

    public void writeResponse(HttpServletResponse response, String exceptionMessage, HttpStatus httpStatusCode) throws IOException {
        String exceptionAsString = objectMapper.writeValueAsString(new ExceptionDto(exceptionMessage));
        response.getWriter().print(exceptionAsString);
        response.setStatus(httpStatusCode.value());
    }
}
