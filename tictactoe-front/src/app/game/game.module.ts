import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseGamesComponent } from './browse-games/browse-games.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { ExtendedModule, FlexModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [
    BrowseGamesComponent,
    LeaderboardsComponent
  ],
    imports: [
        CommonModule,
        FlexModule,
        MatButtonModule,
        RouterLink,
        ExtendedModule,
        MatToolbarModule,
        MatIconModule
    ]
})
export class GameModule { }
