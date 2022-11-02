import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { NotAuthGuard } from "./helpers/guards/not-auth.guard";
import { LoginComponent } from "./authentication/login/login.component";

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [NotAuthGuard]},
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  // otherwise redirect to landing page
  { path: '**', redirectTo: 'landingPage' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
