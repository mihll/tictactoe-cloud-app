import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { NotAuthGuard } from "./helpers/guards/not-auth.guard";
import { LoginComponent } from "./authentication/login/login.component";
import { SignUpComponent } from "./authentication/sign-up/sign-up.component";
import { BrowseGamesComponent } from "./game/browse-games/browse-games.component";
import { AuthGuard } from "./helpers/guards/auth.guard";
import { LeaderboardsComponent } from "./game/leaderboards/leaderboards.component";
import { BrowseGamesResolver } from "./game/resolvers/browse-games.resolver";
import { PlayGameComponent } from "./game/play-game/play-game.component";
import { GameDetailsResolver } from "./game/resolvers/game-details.resolver";

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [NotAuthGuard]},
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  { path: 'signup', component: SignUpComponent, canActivate: [NotAuthGuard]},
  { path: 'browseGames', component: BrowseGamesComponent, resolve: {availableGames: BrowseGamesResolver}, canActivate: [AuthGuard]},
  { path: 'leaderboards', component: LeaderboardsComponent, canActivate: [AuthGuard]},
  { path: 'playGame/:gameId', component: PlayGameComponent, resolve: {gameDetails: GameDetailsResolver}, canActivate: [AuthGuard]},
  // otherwise redirect to landing page
  { path: '**', redirectTo: 'landingPage' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
