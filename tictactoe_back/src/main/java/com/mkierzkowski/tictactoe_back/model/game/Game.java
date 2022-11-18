package com.mkierzkowski.tictactoe_back.model.game;

import com.mkierzkowski.tictactoe_back.model.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "games")
@Getter
@Setter
@Accessors(chain = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Game {
    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    User player1;

    @ManyToOne
    User player2;
}
