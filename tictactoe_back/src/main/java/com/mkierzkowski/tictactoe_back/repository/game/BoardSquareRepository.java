package com.mkierzkowski.tictactoe_back.repository.game;

import com.mkierzkowski.tictactoe_back.model.game.BoardSquare;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardSquareRepository extends JpaRepository<BoardSquare, Long> {
}
