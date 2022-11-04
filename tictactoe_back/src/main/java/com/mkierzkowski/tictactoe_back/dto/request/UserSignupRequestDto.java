package com.mkierzkowski.tictactoe_back.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mkierzkowski.tictactoe_back.validation.ValidPassword;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserSignupRequestDto {

    @NotEmpty(message = "{constraints.NotEmpty.message}")
    private String email;

    @NotEmpty(message = "{constraints.NotEmpty.message}")
    @ValidPassword
    private String password;

    @NotEmpty(message = "{constraints.NotEmpty.message}")
    private String username;
}
