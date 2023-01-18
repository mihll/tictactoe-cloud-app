package com.mkierzkowski.tictactoe_back.service.game;

import com.mkierzkowski.tictactoe_back.dto.request.GameBoardMoveRequestDto;
import com.mkierzkowski.tictactoe_back.exception.BadRequestException;
import com.mkierzkowski.tictactoe_back.exception.NotFoundException;
import com.mkierzkowski.tictactoe_back.exception.ValidationException;
import com.mkierzkowski.tictactoe_back.model.game.BoardSquare;
import com.mkierzkowski.tictactoe_back.model.game.BoardSquareContent;
import com.mkierzkowski.tictactoe_back.model.game.Game;
import com.mkierzkowski.tictactoe_back.model.game.GameStatus;
import com.mkierzkowski.tictactoe_back.model.user.User;
import com.mkierzkowski.tictactoe_back.repository.game.BoardSquareRepository;
import com.mkierzkowski.tictactoe_back.repository.game.GameRepository;
import com.mkierzkowski.tictactoe_back.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;

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

    @Override
    public void boardMove(Long gameId, GameBoardMoveRequestDto gameBoardMoveRequestDto, Errors errors) {
        User currentUser = userService.getCurrentUser();
        Optional<Game> requestedGame = gameRepository.findById(gameId);

        requestedGame.ifPresentOrElse( game -> {
            // only current player can perform the move
            if (!Objects.equals(game.getCurrentPlayer().getId(), currentUser.getId())) {
                throw new BadRequestException("error.operationNotPermitted");
            }

            // game can be played only during the game
            if (game.getStatus() != GameStatus.IN_PROGRESS) {
                throw new BadRequestException("error.operationNotPermitted");
            }

            performBoardMove(game, gameBoardMoveRequestDto.getBoardSquareId(), currentUser, errors);
            updateBoardStatus(game);

            gameRepository.saveAndFlush(game);
        }, () -> {
            throw new NotFoundException("error.gameNotExists");
        });
    }

    private void performBoardMove(Game game, Integer boardSquareId, User currentUser, Errors errors) {
        // if move is performed by the player 1, choose X, otherwise choose O
        BoardSquareContent boardSquareContent = Objects.equals(game.getPlayer1().getId(), currentUser.getId()) ? BoardSquareContent.X : BoardSquareContent.O;

        // get board square with specified ID
        Optional<BoardSquare> boardSquare = game.getBoard()
                .stream()
                .filter(bs -> Objects.equals(bs.getSquareId(), boardSquareId))
                .findFirst();

        boardSquare.ifPresentOrElse(bs -> {
            // cannot move on already taken square
            if (bs.getContent() != null) {
                errors.rejectValue("boardSquareId", "error.boardSquareUsed", "error.boardSquareUsed");
                throw new ValidationException(errors);
            }

            bs.setContent(boardSquareContent);
            boardSquareRepository.saveAndFlush(bs);

            // change player after move
            if (boardSquareContent == BoardSquareContent.X) {
                game.setCurrentPlayer(game.getPlayer2());
            } else {
                game.setCurrentPlayer(game.getPlayer1());
            }

        }, () -> {
            errors.rejectValue("boardSquareId", "error.boardSquareNotExists", "error.boardSquareNotExists");
            throw new ValidationException(errors);
        });
    }

    private void updateBoardStatus(Game game) {
        // check for win
        List<BoardSquare> board = game.getBoard();
        for (int possibleLineCase = 0; possibleLineCase < 8; possibleLineCase++) {
            String line = switch (possibleLineCase) {
                case 0 ->
                        getContentOrEmptyString(board.get(0).getContent()) + getContentOrEmptyString(board.get(1).getContent()) + getContentOrEmptyString(board.get(2).getContent());
                case 1 ->
                        getContentOrEmptyString(board.get(3).getContent()) + getContentOrEmptyString(board.get(4).getContent()) + getContentOrEmptyString(board.get(5).getContent());
                case 2 ->
                        getContentOrEmptyString(board.get(6).getContent()) + getContentOrEmptyString(board.get(7).getContent()) + getContentOrEmptyString(board.get(8).getContent());
                case 3 ->
                        getContentOrEmptyString(board.get(0).getContent()) + getContentOrEmptyString(board.get(3).getContent()) + getContentOrEmptyString(board.get(6).getContent());
                case 4 ->
                        getContentOrEmptyString(board.get(1).getContent()) + getContentOrEmptyString(board.get(4).getContent()) + getContentOrEmptyString(board.get(7).getContent());
                case 5 ->
                        getContentOrEmptyString(board.get(2).getContent()) + getContentOrEmptyString(board.get(5).getContent()) + getContentOrEmptyString(board.get(8).getContent());
                case 6 ->
                        getContentOrEmptyString(board.get(0).getContent()) + getContentOrEmptyString(board.get(4).getContent()) + getContentOrEmptyString(board.get(8).getContent());
                case 7 ->
                        getContentOrEmptyString(board.get(2).getContent()) + getContentOrEmptyString(board.get(4).getContent()) + getContentOrEmptyString(board.get(6).getContent());
                default -> null;
            };

            if (line.equals("XXX")) {
                game.setWinnerPlayer(game.getPlayer1());
                game.setStatus(GameStatus.WON);
            } else if (line.equals("OOO")) {
                game.setWinnerPlayer(game.getPlayer2());
                game.setStatus(GameStatus.WON);
            }
        }


        // if not won (not returned yet) check for draw
        if (game.getStatus() != GameStatus.WON) {
            boolean areAllBoardSquaresTaken = game.getBoard()
                    .stream()
                    .noneMatch(bs -> bs.getContent() == null);

            if (areAllBoardSquaresTaken) {
                game.setStatus(GameStatus.DRAW);
            }
        }
    }

    private String getContentOrEmptyString(BoardSquareContent content) {
        if (content == null) {
            return "";
        } else {
            return content.toString();
        }
    }
}
