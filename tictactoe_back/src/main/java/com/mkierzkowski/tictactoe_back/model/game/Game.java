package com.mkierzkowski.tictactoe_back.model.game;

import com.mkierzkowski.tictactoe_back.model.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "games")
@Getter
@Setter
@Accessors(chain = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    User player1;

    @ManyToOne
    User player2;

    @NotNull
    GameStatus status = GameStatus.WAITING_FOR_OTHER_PLAYER;

    @ManyToOne
    User winnerPlayer;

    @ManyToOne
    User currentPlayer;

    @OneToMany(mappedBy = "game")
    List<BoardSquare> board = new ArrayList<>();

    public Game(User gameCreator) {
        this.player1 = gameCreator;
    }
}
