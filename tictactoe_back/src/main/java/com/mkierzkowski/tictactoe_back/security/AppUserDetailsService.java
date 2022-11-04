package com.mkierzkowski.tictactoe_back.security;

import com.mkierzkowski.tictactoe_back.model.user.User;
import com.mkierzkowski.tictactoe_back.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(username));

        return new AppUserDetails(user.getId(), user.getEmail(), user.getPassword(),
                true, true, true, true, Collections.emptyList());

    }
}
