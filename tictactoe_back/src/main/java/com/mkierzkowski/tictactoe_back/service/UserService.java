package com.mkierzkowski.tictactoe_back.service;

import com.mkierzkowski.tictactoe_back.dto.request.UserSignupRequestDto;
import com.mkierzkowski.tictactoe_back.model.user.User;

public interface UserService {

    void signup(UserSignupRequestDto userSignupRequestDto);

    User findUserByEmail(String email);

    User findUserById(Long id);

    User getCurrentUser();
}
