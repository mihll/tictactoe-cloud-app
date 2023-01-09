import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { GameService } from "../services/game.service";
import { GameDetails } from "../models/GameDetails";
import { SnackbarService } from "../../shared/snackbar/snackbar-service/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class GameDetailsResolver implements Resolve<GameDetails> {

  constructor(private readonly gameService: GameService,
              private readonly router: Router,
              private readonly snackbarService: SnackbarService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GameDetails> {
    return this.gameService.getGameDetails(route.params["gameId"] ?? "")
      .pipe(
        catchError(() => {
          this.router.navigate(["/browseGames"]).then(() => this.snackbarService.openErrorSnackbar('There was an error while retrieving the game data!'));
          return EMPTY;
        })
      );
  }
}
