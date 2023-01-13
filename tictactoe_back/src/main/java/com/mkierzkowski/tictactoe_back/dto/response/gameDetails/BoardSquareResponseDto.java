package com.mkierzkowski.tictactoe_back.dto.response.gameDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mkierzkowski.tictactoe_back.model.game.BoardSquareContent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class BoardSquareResponseDto {
    Integer squareId;
    BoardSquareContent content;
}
