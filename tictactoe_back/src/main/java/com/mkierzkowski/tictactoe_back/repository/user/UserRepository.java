package com.mkierzkowski.tictactoe_back.repository.user;

import com.mkierzkowski.tictactoe_back.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
