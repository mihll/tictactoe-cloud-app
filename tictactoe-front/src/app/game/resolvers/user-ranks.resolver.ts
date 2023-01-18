import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserRank } from "../models/UserRank";
import { GameService } from "../services/game.service";

@Injectable({
  providedIn: 'root'
})
export class UserRanksResolver implements Resolve<UserRank[]> {

  constructor(private readonly gameService: GameService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserRank[]> {
    return this.gameService.getUsersRanks();
  }
}
