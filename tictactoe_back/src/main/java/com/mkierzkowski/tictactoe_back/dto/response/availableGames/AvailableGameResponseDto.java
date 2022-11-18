package com.mkierzkowski.tictactoe_back.dto.response.availableGames;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AvailableGameResponseDto {
    Long id;
    String oponentUsername;
    Date creationDate;
}
