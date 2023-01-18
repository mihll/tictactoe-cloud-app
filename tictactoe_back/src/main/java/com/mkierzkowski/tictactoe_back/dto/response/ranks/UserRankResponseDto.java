package com.mkierzkowski.tictactoe_back.dto.response.ranks;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserRankResponseDto {
    Integer rankPosition;

    String username;

    Integer wins;

    Integer loses;

    Integer draws;
}
