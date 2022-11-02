import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SnackbarService } from "../../shared/snackbar/snackbar-service/snackbar.service";
import { AuthenticationService } from "../services/authentication-service/authentication.service";
import { SignupRequest } from "../models/signupRequest";
import {
  checkEmailMismatch,
  checkPasswordsMismatch,
  CrossFieldErrorMatcher
} from "../../helpers/formControlMatching/formControlMatching";
import { DialogService } from "../../shared/dialog/dialog-service/dialog.service";
import { BackendError } from "../../shared/models/BackendError";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, AfterContentChecked {
  signupForm: FormGroup;
  signupRequest: SignupRequest | undefined;
  errorMatcher = new CrossFieldErrorMatcher("emailMismatch");
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService,
    private dialogService: DialogService,
    private authenticationService: AuthenticationService,
    private cdRef: ChangeDetectorRef
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      repeatEmail: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(60),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/\d/),
        Validators.pattern(/[!"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]/)
      ])],
      repeatPassword: ['', Validators.required],
    }, {validators: [checkEmailMismatch, checkPasswordsMismatch]});
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  get f(): { [p: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    this.signupRequest = {
      email: this.f['email'].value,
      username: this.f['username'].value,
      password: this.f['password'].value
    };

    this.authenticationService.signup(this.signupRequest)
      .subscribe({
        next: () => {
          this.loading = false;
          this.dialogService.openInfoDialog('Almost there!',
            'You can now log in using the provided <b>e-mail address</b> and <b>password</b>.', true, "/login");
        },
        error: err => {
          const backendError : BackendError = err.error
          if (backendError.globalException.message === 'error.failedValidation') {
            if (backendError.validationErrors[0].message == "error.emailExists") {
              this.snackbarService.openErrorSnackbar('Account with provided email address already exists');
              this.f['email'].setErrors({ emailAlreadyUsed: true });
            } else if (backendError.validationErrors[0].message == "error.usernameExists") {
              this.snackbarService.openErrorSnackbar('Account with provided username already exists');
              this.f['username'].setErrors({ usernameAlreadyUsed: true });
            }
          } else {
            this.snackbarService.openErrorSnackbar('There was an error during signup');
          }
          this.loading = false;
        }
      });
  }

}
