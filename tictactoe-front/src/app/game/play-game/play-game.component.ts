import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GameDetails } from "../models/GameDetails";
import { DialogService } from "../../shared/dialog/dialog-service/dialog.service";
import { GameService } from "../services/game.service";
import { SnackbarService } from "../../shared/snackbar/snackbar-service/snackbar.service";

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit {
  gameDetails: GameDetails;
  loading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) {
    this.gameDetails = this.activatedRoute.snapshot.data['gameDetails'];
    this.loading = false;
  }

  ngOnInit(): void {
  }

  promptForLeaveConfirmation() {
    this.dialogService.openYesNoDialog("Do you really want to leave this game?",
      `If you leave this game, your opponent will also be disconnected and this game will be marked as 'not resolved' - it will not be counted as won or a draw in the ranks.`)
      .beforeClosed().subscribe(result => {
      if (result) {
        this.leaveGame();
      }
    });
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
