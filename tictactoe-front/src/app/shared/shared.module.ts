import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { IconSnackbarComponent } from './snackbar/icon-snackbar/icon-snackbar.component';
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    IconSnackbarComponent
  ],
  exports: [
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule
  ]
})
export class SharedModule { }
