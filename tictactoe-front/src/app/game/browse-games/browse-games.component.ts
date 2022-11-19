import { Component, OnInit } from '@angular/core';
import { SnackbarService } from "../../shared/snackbar/snackbar-service/snackbar.service";
import { AvailableGame } from "../models/AvailableGame";
import { ActivatedRoute } from "@angular/router";
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
    private gameService: GameService
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
      this.snackbarService.openSuccessSnackbar(`New game created successfully! (ID: ${response.id})`)
    })
  }

}
