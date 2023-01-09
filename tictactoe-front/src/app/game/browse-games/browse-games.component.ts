import { Component, OnInit } from '@angular/core';
import { SnackbarService } from "../../shared/snackbar/snackbar-service/snackbar.service";
import { AvailableGame } from "../models/AvailableGame";
import { ActivatedRoute, Router } from "@angular/router";
import { GameService } from "../services/game.service";

@Component({
  selector: 'app-browse-games',
  templateUrl: './browse-games.component.html',
  styleUrls: ['./browse-games.component.scss']
})
export class BrowseGamesComponent implements OnInit {
  availableGames: AvailableGame[];
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    private gameService: GameService,
    private router: Router
  ) {
    this.availableGames = this.activatedRoute.snapshot.data['availableGames'];
  }

  ngOnInit(): void {
  }

  reloadData() : void {
    this.loading = true;
    this.gameService.getAvailableGames().subscribe(response => {
      this.availableGames = response;
      this.loading = false;
    });
  }

  addNewGame() : void {
    this.gameService.createNewGame().subscribe(response => {
      this.router.navigate([`/playGame/${response.id}`]).then(() =>
        this.snackbarService.openSuccessSnackbar(`New game created successfully!`)
      )
    })
  }

  joinGame(gameId: string) : void {
    this.router.navigate([`/playGame/${gameId}`]);
  }

}
