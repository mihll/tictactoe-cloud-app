import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GameDetails } from "../models/GameDetails";
import { DialogService } from "../../shared/dialog/dialog-service/dialog.service";
import { GameService } from "../services/game.service";
import { SnackbarService } from "../../shared/snackbar/snackbar-service/snackbar.service";
import { GameStatus } from "../models/GameStatus";
import { catchError, filter, of, Subscription, switchMap, timer } from "rxjs";
import { BoardSquare } from "../models/BoardSquare";

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit, OnDestroy {
  gameDetails: GameDetails;
  loading = true;
  opponentName: String;

  titleText: String

  headerText: String;

  isMoveEnabled: boolean = false;

  gameDataSubscription?: Subscription;
  GameStatus = GameStatus;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) {
    this.gameDetails = this.activatedRoute.snapshot.data['gameDetails'];
    this.opponentName = this.gameDetails.opponentPlayerNumber === 1 ? this.gameDetails.player1Name : this.gameDetails.player2Name;
    this.titleText = this.gameDetails.status === GameStatus.WAITING_FOR_OTHER_PLAYER ? "Waiting for other player" : `against ${this.opponentName}`;
    this.headerText = "Waiting for other player to join..."
    this.loading = false;
  }

  ngOnInit(): void {
    if (this.gameDetails.status === GameStatus.DRAW || this.gameDetails.status === GameStatus.WON || this.gameDetails.status === GameStatus.NOT_RESOLVED) {
      this.router.navigate(["/browseGames"]).then(() => this.snackbarService.openErrorSnackbar('This game was already finished!'));
    }
    this.gameDataSubscription = timer(0, 1000)
      .pipe(
        switchMap(() => {
          return this.gameService.getGameDetails(this.gameDetails.id)
            .pipe(catchError(err => {
              console.error(err);
              return of(this.gameDetails);
            }));
        }),
        filter(data => data !== undefined)
      )
      .subscribe(response => {
        this.gameDetails = response
        this.opponentName = this.gameDetails.opponentPlayerNumber === 1 ? this.gameDetails.player1Name : this.gameDetails.player2Name;
        this.titleText = this.gameDetails.status === GameStatus.WAITING_FOR_OTHER_PLAYER ? "Waiting for other player" : `against ${this.opponentName}`;
        if (this.gameDetails.status === GameStatus.IN_PROGRESS) {
          if (this.gameDetails.currentPlayerNumber !== this.gameDetails.opponentPlayerNumber) {
            this.headerText = "Your turn!"
            this.isMoveEnabled = true;
          } else {
            this.headerText = "Waiting for opponent move..."
            this.isMoveEnabled = false;
          }
        }
        this.validateGameStatus();
      });
  }

  ngOnDestroy() {
    this.gameDataSubscription?.unsubscribe();
  }

  performMove(square: BoardSquare) {
    // can perform move only on empty square and if move is enabled
    if (square.content === null && this.isMoveEnabled) {
      this.isMoveEnabled = false;
      this.gameService.performMove(this.gameDetails.id, square).subscribe();
    }
  }

  promptForLeaveConfirmation() {
    this.dialogService.openYesNoDialog("Do you really want to leave this game?",
      `If you leave this game, your opponent will also be disconnected and<br>this game will be marked as 'not resolved' - it will not be counted as won or a draw in the ranks.`)
      .beforeClosed().subscribe(result => {
      if (result) {
        this.leaveGame();
      }
    });
  }

  private validateGameStatus() {
    switch (this.gameDetails.status) {
      case GameStatus.NOT_RESOLVED:
        this.gameDataSubscription?.unsubscribe();
        this.dialogService.openInfoDialog("Your opponent left the game",
          "Your opponent has left this game session.<br>This game will be marked as 'not resolved' - it will not be counted as won or a draw in the ranks.",true,"/browseGames");
        break;
      case GameStatus.WON:
        this.gameDataSubscription?.unsubscribe();
        if (this.gameDetails.winnerPlayerNumber != this.gameDetails.opponentPlayerNumber) {
          this.dialogService.openInfoDialog("You won!",
            "Congratulations!<br>This game will be counted as 'won' in the ranks.",true,"/browseGames");
        } else {
          this.dialogService.openInfoDialog("You lose!",
            "Too bad :(<br>This game will be counted as 'lost' in the ranks.",true,"/browseGames");
        }
        break;
      case GameStatus.DRAW:
        this.gameDataSubscription?.unsubscribe();
        this.dialogService.openInfoDialog("Draw!",
          "You both did your best.<br>This game will be counted as 'draw' in the ranks.",true,"/browseGames");
    }
  }

  leaveGame() {
    this.loading = true;
    this.gameService.leaveGame(this.gameDetails.id)
      .subscribe({
        next: () => {
          this.router.navigate(["/browseGames"]).then(() => this.snackbarService.openSuccessSnackbar('Game left successfully!'));
        },
        error: () => {
          this.snackbarService.openErrorSnackbar('There was an error during game leave!');
          this.loading = false;
        }
      });
  }

}
