package com.mkierzkowski.tictactoe_back.service.game;

import com.mkierzkowski.tictactoe_back.model.game.Game;

import java.util.List;

public interface GameService {
    List<Game> getAvailableGames();
    Game createNewGame();
}
