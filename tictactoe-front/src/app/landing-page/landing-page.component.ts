import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication/services/authentication-service/authentication.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.userAuthValue()) {
      this.isLoggedIn = true;
    }
  }

}
