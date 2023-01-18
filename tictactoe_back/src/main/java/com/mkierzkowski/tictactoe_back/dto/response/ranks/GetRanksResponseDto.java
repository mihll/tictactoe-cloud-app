package com.mkierzkowski.tictactoe_back.dto.response.ranks;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GetRanksResponseDto {
    List<UserRankResponseDto> usersRanks;
}
