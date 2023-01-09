package com.mkierzkowski.tictactoe_back.service.game;

import com.mkierzkowski.tictactoe_back.exception.BadRequestException;
import com.mkierzkowski.tictactoe_back.exception.NotFoundException;
import com.mkierzkowski.tictactoe_back.model.game.Game;
import com.mkierzkowski.tictactoe_back.model.game.GameStatus;
import com.mkierzkowski.tictactoe_back.model.user.User;
import com.mkierzkowski.tictactoe_back.repository.game.GameRepository;
import com.mkierzkowski.tictactoe_back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Game gameToCreate = new Game(currentUser);

        return gameRepository.saveAndFlush(gameToCreate);
    }

    @Override
    public Game getGameById(Long gameId) {
        User currentUser = userService.getCurrentUser();
        Optional<Game> fetchedGame = gameRepository.findById(gameId);

        fetchedGame.ifPresent( game -> {
            // only users playing specified game can fetch it's details
            if (game.getPlayer1() != currentUser && game.getPlayer2() != currentUser) {
                throw new BadRequestException("error.operationNotPermitted");
            }
        });

        return fetchedGame.orElseThrow(() -> {
            throw new NotFoundException("error.gameNotExists");
        });
    }

    @Override
    public void leaveGame(Long gameId) {
        User currentUser = userService.getCurrentUser();
        Optional<Game> gameToLeave = gameRepository.findById(gameId);

        gameToLeave.ifPresentOrElse( game -> {
            // only users playing specified game can leave it
            if (game.getPlayer1() != currentUser && game.getPlayer2() != currentUser) {
                throw new BadRequestException("error.operationNotPermitted");

            }

            // game can be left only when user is waiting for other player or during the game
            if (game.getStatus() == GameStatus.WON || game.getStatus() == GameStatus.DRAW || game.getStatus() == GameStatus.NOT_RESOLVED) {
                throw new BadRequestException("error.operationNotPermitted");
            }

            game.setStatus(GameStatus.NOT_RESOLVED);
            gameRepository.saveAndFlush(game);
        }, () -> {
            throw new NotFoundException("error.gameNotExists");
        });
    }
}
