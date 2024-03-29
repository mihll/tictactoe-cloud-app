import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AvailableGame } from "../models/AvailableGame";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { CreateNewGameResponse } from "../models/CreateNewGameResponse";
import { GameDetails } from "../models/GameDetails";
import { BoardSquare } from "../models/BoardSquare";
import { UserRank } from "../models/UserRank";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  readonly apiURL = `${environment.apiUrl}/game`;

  constructor(
    private http: HttpClient,
  ) { }

  getAvailableGames() : Observable<AvailableGame[]> {
    return this.http.get<any>(`${this.apiURL}/available`, {withCredentials: true})
      .pipe(map(response => response.availableGames));
  }

  getGameDetails(gameId: string) : Observable<GameDetails> {
    return this.http.get<any>(`${this.apiURL}/${gameId}`,{withCredentials: true});
  }

  performMove(gameId: string, boardSquare: BoardSquare) : Observable<any> {
    return this.http.post<any>(`${this.apiURL}/${gameId}/boardMove`,{boardSquareId: boardSquare.squareId},{withCredentials: true});
  }

  createNewGame() : Observable<CreateNewGameResponse> {
    return this.http.post<CreateNewGameResponse>(`${this.apiURL}/new`, {},{withCredentials: true});
  }

  joinGame(gameId: string) : Observable<any> {
    return this.http.post<any>(`${this.apiURL}/${gameId}/join`,{},{withCredentials: true});
  }

  leaveGame(gameId: string) : Observable<any> {
    return this.http.post<any>(`${this.apiURL}/${gameId}/leave`,{},{withCredentials: true});
  }

  getUsersRanks(): Observable<UserRank[]> {
    return this.http.get<any>(`${this.apiURL}/ranks`, {withCredentials: true})
      .pipe(map(response => response.usersRanks));
  }
}
