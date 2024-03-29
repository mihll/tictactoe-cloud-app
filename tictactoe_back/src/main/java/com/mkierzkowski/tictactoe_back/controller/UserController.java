package com.mkierzkowski.tictactoe_back.controller;

import com.mkierzkowski.tictactoe_back.dto.request.UserSignupRequestDto;
import com.mkierzkowski.tictactoe_back.dto.response.UserResponseDto;
import com.mkierzkowski.tictactoe_back.model.user.User;
import com.mkierzkowski.tictactoe_back.service.user.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController extends BaseController {

    @Autowired
    UserService userService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getMyDetails() {
        User currentUser = userService.getCurrentUser();
        UserResponseDto responseDto = modelMapper.map(currentUser, UserResponseDto.class);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> signup(@RequestBody @Valid UserSignupRequestDto userSignupRequestDto, Errors errors) {
        userService.signup(userSignupRequestDto, errors);
        return ResponseEntity.ok().build();
    }
}
