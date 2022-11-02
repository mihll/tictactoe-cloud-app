import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { AuthenticationService } from './authentication/services/authentication-service/authentication.service';
import { Router } from "@angular/router";
import { SnackbarService } from "./shared/snackbar/snackbar-service/snackbar.service";
import { LayoutService } from './shared/layout-service/layout.service';
import { UserAuth } from "./authentication/models/UserAuth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userAuth: UserAuth | undefined;
  loading = false;

  isHandset$: Observable<boolean>;

  constructor(private router: Router,
              private snackbarService: SnackbarService,
              private authenticationService: AuthenticationService,
              private layoutService: LayoutService) {
    this.isHandset$ = this.layoutService.isHandset$;
    this.authenticationService.userAuthObservable.subscribe(x => this.userAuth = x);
    this.authenticationService.readStoredUserAuth();
  }

  logout(): void {
    this.loading = true;
    this.authenticationService.logout()
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/']).then(() => this.snackbarService.openSuccessSnackbar('Logged out successfully!'));
        },
        error: () => {
          this.loading = false;
          this.router.navigate(['/']).then(() => this.snackbarService.openErrorSnackbar('Logout error!'));
        }
      });
  }
}
