package com.mkierzkowski.tictactoe_back.repository.game;

import com.mkierzkowski.tictactoe_back.model.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
