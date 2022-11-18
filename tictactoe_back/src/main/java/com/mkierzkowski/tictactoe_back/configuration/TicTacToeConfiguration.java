package com.mkierzkowski.tictactoe_back.configuration;

import com.mkierzkowski.tictactoe_back.dto.response.availableGames.AvailableGameResponseDto;
import com.mkierzkowski.tictactoe_back.model.game.Game;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TicTacToeConfiguration {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setAmbiguityIgnored(true)
                .setMatchingStrategy(MatchingStrategies.LOOSE);

        modelMapper.typeMap(Game.class, AvailableGameResponseDto.class).addMappings(mapper ->
                mapper.map(src -> src.getPlayer1().getUsername(), AvailableGameResponseDto::setOponentUsername));

        return modelMapper;
    }
}
