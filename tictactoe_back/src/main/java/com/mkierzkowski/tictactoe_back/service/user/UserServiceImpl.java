package com.mkierzkowski.tictactoe_back.service.user;

import com.mkierzkowski.tictactoe_back.dto.request.UserSignupRequestDto;
import com.mkierzkowski.tictactoe_back.exception.ValidationException;
import com.mkierzkowski.tictactoe_back.model.user.User;
import com.mkierzkowski.tictactoe_back.repository.user.UserRepository;
import com.mkierzkowski.tictactoe_back.security.AppUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public void signup(UserSignupRequestDto userSignupRequestDto, Errors errors) {

        Optional<User> existingEmailUser = userRepository.findByEmail(userSignupRequestDto.getEmail());
        if (existingEmailUser.isPresent()) {
            errors.rejectValue("email", "error.emailExists", "error.emailExists");
            throw new ValidationException(errors);
        }

        Optional<User> existingUsernameUser = userRepository.findByUsername(userSignupRequestDto.getUsername());
        if (existingUsernameUser.isPresent()) {
            errors.rejectValue("username", "error.usernameExists", "error.usernameExists");
            throw new ValidationException(errors);
        }

        User registeredUser = new User()
                .setEmail(userSignupRequestDto.getEmail())
                .setUsername(userSignupRequestDto.getUsername())
                .setPassword(passwordEncoder.encode(userSignupRequestDto.getPassword()));
        userRepository.save(registeredUser);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(RuntimeException::new);
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(RuntimeException::new);
    }

    @Override
    public User getCurrentUser() {
        AppUserDetails userFormContext = (AppUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return findUserById(userFormContext.getId());
    }
}