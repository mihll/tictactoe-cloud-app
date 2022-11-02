import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { IconSnackbarComponent } from './snackbar/icon-snackbar/icon-snackbar.component';
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpClientModule } from "@angular/common/http";
import { SimpleInfoDialogComponent } from './dialog/simple-info-dialog/simple-info-dialog.component';
import { YesNoDialogComponent } from './dialog/yes-no-dialog/yes-no-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { PasswordInputComponent } from './password-input/password-input.component';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    IconSnackbarComponent,
    SimpleInfoDialogComponent,
    YesNoDialogComponent,
    PasswordInputComponent
  ],
  exports: [
    LoadingSpinnerComponent,
    PasswordInputComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatPasswordStrengthModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
