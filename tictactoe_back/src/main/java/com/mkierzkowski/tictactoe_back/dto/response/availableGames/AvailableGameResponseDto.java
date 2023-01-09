package com.mkierzkowski.tictactoe_back.dto.response.availableGames;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AvailableGameResponseDto {
    Long id;
    String oponentUsername;
}
