package com.mkierzkowski.tictactoe_back.service.game;

import com.mkierzkowski.tictactoe_back.model.game.Game;
import com.mkierzkowski.tictactoe_back.model.user.User;
import com.mkierzkowski.tictactoe_back.repository.game.GameRepository;
import com.mkierzkowski.tictactoe_back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    UserService userService;

    @Autowired
    GameRepository gameRepository;

    @Override
    public List<Game> getAvailableGames() {
        User currentUser = userService.getCurrentUser();

        List<Game> allGames = gameRepository.findAll();
        return allGames.stream()
                .filter(game -> game.getPlayer1() != currentUser && game.getPlayer2() == null)
                .toList();
    }

    @Override
    public Game createNewGame() {
        User currentUser = userService.getCurrentUser();
        Game gameToCreate = new Game().setPlayer1(currentUser);

        return gameRepository.saveAndFlush(gameToCreate);
    }
}
