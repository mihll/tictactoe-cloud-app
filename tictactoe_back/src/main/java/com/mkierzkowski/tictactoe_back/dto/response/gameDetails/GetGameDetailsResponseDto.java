package com.mkierzkowski.tictactoe_back.dto.response.gameDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mkierzkowski.tictactoe_back.model.game.GameStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GetGameDetailsResponseDto {
    Long id;

    Long player1Id;
    Long player2Id;

    String player1Name;
    String player2Name;

    Integer opponentPlayerNumber;

    Integer currentPlayerNumber;

    Integer winnerPlayerNumber;

    List<BoardSquareResponseDto> board;

    GameStatus status;
}
