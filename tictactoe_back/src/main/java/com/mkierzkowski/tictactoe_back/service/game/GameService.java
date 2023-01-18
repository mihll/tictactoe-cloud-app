package com.mkierzkowski.tictactoe_back.service.game;

import com.mkierzkowski.tictactoe_back.dto.request.GameBoardMoveRequestDto;
import com.mkierzkowski.tictactoe_back.dto.response.ranks.UserRankResponseDto;
import com.mkierzkowski.tictactoe_back.model.game.Game;
import org.springframework.validation.Errors;

import java.util.List;

public interface GameService {
    List<Game> getAvailableGames();
    Game createNewGame();
    Game getGameById(Long gameId);
    void joinGame(Long gameId);
    void leaveGame(Long gameId);
    void boardMove(Long gameId, GameBoardMoveRequestDto gameBoardMoveRequestDto, Errors errors);
    List<UserRankResponseDto> getRanks();
}
