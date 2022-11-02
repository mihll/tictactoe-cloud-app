import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/services/authentication-service/authentication.service';
import { SnackbarService } from '../../shared/snackbar/snackbar-service/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authenticationService.userAuthValue();
    if (!user) {
      // not logged in so return true
      return true;
    } else {
      // logged in and accessing root, so redirect without message
      if (route.toString() === '/') {
        this.router.navigate(['/browseGames']);
        return false;
      }
      // logged in so redirect to myBoards page
      this.router.navigate(['/browseGames']).then( () => this.snackbarService.openSuccessSnackbar("You're already logged in!"));
      return false;
    }
  }

}
