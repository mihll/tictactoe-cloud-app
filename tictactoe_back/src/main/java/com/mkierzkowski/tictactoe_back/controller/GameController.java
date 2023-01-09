package com.mkierzkowski.tictactoe_back.controller;

import com.mkierzkowski.tictactoe_back.dto.response.availableGames.AvailableGameResponseDto;
import com.mkierzkowski.tictactoe_back.dto.response.CreateNewGameResponseDto;
import com.mkierzkowski.tictactoe_back.dto.response.availableGames.GetAvailableGamesResponseDto;
import com.mkierzkowski.tictactoe_back.dto.response.gameDetails.GetGameDetailsResponseDto;
import com.mkierzkowski.tictactoe_back.model.game.Game;
import com.mkierzkowski.tictactoe_back.service.game.GameService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game")
public class GameController extends BaseController {

    @Autowired
    GameService gameService;

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
        GetGameDetailsResponseDto responseDto = modelMapper.map(fetchedGame, GetGameDetailsResponseDto.class);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{gameId:.+}/leave")
    public ResponseEntity<?> leaveGame(@PathVariable Long gameId) {
        gameService.leaveGame(gameId);
        return ResponseEntity.ok().build();
    }
}
