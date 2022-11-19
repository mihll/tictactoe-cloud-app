import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AvailableGame } from "../models/AvailableGame";
import { GameService } from "../services/game.service";

@Injectable({
  providedIn: 'root'
})
export class BrowseGamesResolver implements Resolve<AvailableGame[]> {

  constructor(private readonly gameService: GameService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AvailableGame[]> {
    return this.gameService.getAvailableGames();
  }
}
