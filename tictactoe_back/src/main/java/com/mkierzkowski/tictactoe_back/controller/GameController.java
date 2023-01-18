package com.mkierzkowski.tictactoe_back.controller;

import com.mkierzkowski.tictactoe_back.dto.request.GameBoardMoveRequestDto;
import com.mkierzkowski.tictactoe_back.dto.response.availableGames.AvailableGameResponseDto;
import com.mkierzkowski.tictactoe_back.dto.response.CreateNewGameResponseDto;
import com.mkierzkowski.tictactoe_back.dto.response.availableGames.GetAvailableGamesResponseDto;
import com.mkierzkowski.tictactoe_back.dto.response.gameDetails.BoardSquareResponseDto;
import com.mkierzkowski.tictactoe_back.dto.response.gameDetails.GetGameDetailsResponseDto;
import com.mkierzkowski.tictactoe_back.model.game.Game;
import com.mkierzkowski.tictactoe_back.model.game.GameStatus;
import com.mkierzkowski.tictactoe_back.model.user.User;
import com.mkierzkowski.tictactoe_back.service.game.GameService;
import com.mkierzkowski.tictactoe_back.service.user.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/game")
public class GameController extends BaseController {

    @Autowired
    GameService gameService;

    @Autowired
    UserService userService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping("/available")
    public ResponseEntity<GetAvailableGamesResponseDto> getAvailableGames() {
        List<Game> availableGames = gameService.getAvailableGames();
        GetAvailableGamesResponseDto responseDto = new GetAvailableGamesResponseDto();

        responseDto.setAvailableGames(availableGames
                .stream()
                .map(availableGame -> modelMapper.map(availableGame, AvailableGameResponseDto.class))
                .toList());

        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CreateNewGameResponseDto> newGame() {
        Game createdGame = gameService.createNewGame();
        CreateNewGameResponseDto responseDto = modelMapper.map(createdGame, CreateNewGameResponseDto.class);
        return ResponseEntity.ok(responseDto);
    }
    @GetMapping("/{gameId:.+}")
    public ResponseEntity<?> getGameDetails(@PathVariable Long gameId) {
        Game fetchedGame = gameService.getGameById(gameId);
        GetGameDetailsResponseDto responseDto = new GetGameDetailsResponseDto();
        responseDto.setId(fetchedGame.getId());
        responseDto.setPlayer1Id(fetchedGame.getPlayer1().getId());
        responseDto.setPlayer2Id(fetchedGame.getPlayer2() != null ? fetchedGame.getPlayer2().getId() : null);
        responseDto.setPlayer1Name(fetchedGame.getPlayer1().getUsername());
        responseDto.setPlayer2Name(fetchedGame.getPlayer2() != null ? fetchedGame.getPlayer2().getUsername() : null);
        User currentUser = userService.getCurrentUser();
        int opponentPlayerNumber = 2;
        if (Objects.equals(currentUser.getId(), responseDto.getPlayer2Id())) {
            opponentPlayerNumber = 1;
        }
        responseDto.setOpponentPlayerNumber(opponentPlayerNumber);
        if (Objects.equals(fetchedGame.getPlayer1().getId(), fetchedGame.getCurrentPlayer().getId())) {
            responseDto.setCurrentPlayerNumber(1);
        } else {
            responseDto.setCurrentPlayerNumber(2);
        }
        if (fetchedGame.getStatus() == GameStatus.WON) {
            if (Objects.equals(fetchedGame.getPlayer1().getId(), fetchedGame.getWinnerPlayer().getId())) {
                responseDto.setWinnerPlayerNumber(1);
            } else {
                responseDto.setWinnerPlayerNumber(2);
            }
        }
        responseDto.setStatus(fetchedGame.getStatus());
        responseDto.setBoard(fetchedGame.getBoard()
                .stream()
                .map(boardSquare -> modelMapper.map(boardSquare, BoardSquareResponseDto.class))
                .toList());

        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{gameId:.+}/join")
    public ResponseEntity<?> joinGame(@PathVariable Long gameId) {
        gameService.joinGame(gameId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{gameId:.+}/leave")
    public ResponseEntity<?> leaveGame(@PathVariable Long gameId) {
        gameService.leaveGame(gameId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{gameId:.+}/boardMove")
    public ResponseEntity<?> gameBoardMove(@PathVariable Long gameId, @RequestBody @Valid GameBoardMoveRequestDto gameBoardMoveRequestDto, Errors errors) {
        gameService.boardMove(gameId, gameBoardMoveRequestDto, errors);
        return ResponseEntity.ok().build();
    }
}
