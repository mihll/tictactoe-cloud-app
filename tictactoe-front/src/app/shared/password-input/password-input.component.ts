import { Component, Input, OnInit } from '@angular/core';
import { CrossFieldErrorMatcher } from 'src/app/helpers/formControlMatching/formControlMatching';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {
  @Input() parentForm: FormGroup = new FormGroup({});
  errorMatcher = new CrossFieldErrorMatcher("passwordMismatch");
  hidePassword = true;
  hideRepeatPassword = true;

  constructor() {
  }

  ngOnInit(): void {
  }
}
