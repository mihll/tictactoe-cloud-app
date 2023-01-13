package com.mkierzkowski.tictactoe_back.service.game;

import com.mkierzkowski.tictactoe_back.exception.BadRequestException;
import com.mkierzkowski.tictactoe_back.exception.NotFoundException;
import com.mkierzkowski.tictactoe_back.model.game.BoardSquare;
import com.mkierzkowski.tictactoe_back.model.game.Game;
import com.mkierzkowski.tictactoe_back.model.game.GameStatus;
import com.mkierzkowski.tictactoe_back.model.user.User;
import com.mkierzkowski.tictactoe_back.repository.game.BoardSquareRepository;
import com.mkierzkowski.tictactoe_back.repository.game.GameRepository;
import com.mkierzkowski.tictactoe_back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    UserService userService;

    @Autowired
    GameRepository gameRepository;

    @Autowired
    BoardSquareRepository  boardSquareRepository;

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

        gameToCreate = gameRepository.saveAndFlush(gameToCreate);

        for (int i = 0; i < 9; i++) {
            boardSquareRepository.saveAndFlush(new BoardSquare().setGame(gameToCreate).setSquareId(i));
        }

        return gameToCreate;
    }

    @Override
    public Game getGameById(Long gameId) {
        User currentUser = userService.getCurrentUser();
        Optional<Game> fetchedGame = gameRepository.findById(gameId);

        fetchedGame.ifPresent( game -> {
            // only users playing specified game can fetch it's details
            if (!Objects.equals(game.getPlayer1().getId(), currentUser.getId()) && !Objects.equals(game.getPlayer2().getId(), currentUser.getId())) {
                throw new BadRequestException("error.operationNotPermitted");
            }
        });

        return fetchedGame.orElseThrow(() -> {
            throw new NotFoundException("error.gameNotExists");
        });
    }

    @Override
    public void joinGame(Long gameId) {
        User currentUser = userService.getCurrentUser();
        Optional<Game> gameToJoin = gameRepository.findById(gameId);

        gameToJoin.ifPresentOrElse( game -> {
            // only different user than existing player 1 can join a game
            if (Objects.equals(game.getPlayer1().getId(), currentUser.getId())) {
                throw new BadRequestException("error.operationNotPermitted");
            }

            // game can be joined only when user is waiting for other player
            if (game.getStatus() != GameStatus.WAITING_FOR_OTHER_PLAYER) {
                throw new BadRequestException("error.operationNotPermitted");
            }

            game.setPlayer2(currentUser);
            game.setStatus(GameStatus.IN_PROGRESS);
            gameRepository.saveAndFlush(game);
        }, () -> {
            throw new NotFoundException("error.gameNotExists");
        });
    }

    @Override
    public void leaveGame(Long gameId) {
        User currentUser = userService.getCurrentUser();
        Optional<Game> gameToLeave = gameRepository.findById(gameId);

        gameToLeave.ifPresentOrElse( game -> {
            // only users playing specified game can leave it
            if (!Objects.equals(game.getPlayer1().getId(), currentUser.getId()) && !Objects.equals(game.getPlayer2().getId(), currentUser.getId())) {
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
