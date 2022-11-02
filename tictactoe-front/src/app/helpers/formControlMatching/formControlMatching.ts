import { ErrorStateMatcher } from "@angular/material/core";
import { FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors } from "@angular/forms";

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  expectedError: string;

  constructor(expectedError: string) {
    this.expectedError = expectedError;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(
      control
      && control.parent
      && control.parent.invalid
      && control.parent.dirty
      && control.parent.hasError(this.expectedError));
  }
}

export const checkEmailMismatch = (formGroup: FormGroup): ValidationErrors | null => {
  const email = formGroup.get('email');
  const repeatEmail = formGroup.get('repeatEmail');
  return email && repeatEmail && email.value !== repeatEmail.value ? { emailMismatch: true } : null;
};

export const checkPasswordsMismatch = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');
  return password && repeatPassword && password.value !== repeatPassword.value ? { passwordMismatch: true } : null;
};
