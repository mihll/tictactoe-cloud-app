import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseGamesComponent } from './browse-games/browse-games.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { ExtendedModule, FlexModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "../shared/shared.module";
import { MatListModule } from "@angular/material/list";
import { PlayGameComponent } from './play-game/play-game.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";



@NgModule({
  declarations: [
    BrowseGamesComponent,
    LeaderboardsComponent,
    PlayGameComponent,
    BoardComponent,
    SquareComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatButtonModule,
    RouterLink,
    ExtendedModule,
    MatToolbarModule,
    MatIconModule,
    SharedModule,
    MatListModule,
    MatTableModule,
    MatSortModule
  ]
})
export class GameModule { }
