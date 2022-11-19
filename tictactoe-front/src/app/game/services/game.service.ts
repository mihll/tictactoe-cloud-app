import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AvailableGame } from "../models/AvailableGame";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { CreateNewGameResponse } from "../models/CreateNewGameResponse";

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

  createNewGame() : Observable<CreateNewGameResponse> {
    return this.http.post<CreateNewGameResponse>(`${this.apiURL}/new`, {},{withCredentials: true})
  }
}
