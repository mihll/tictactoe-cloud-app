import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconSnackbarComponent } from "../icon-snackbar/icon-snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private defaultSnackbarDuration = 2500;

  constructor(private snackBar: MatSnackBar) { }

  openSuccessSnackbar(message: string): void {
    this.snackBar.openFromComponent(IconSnackbarComponent, {
      data: {icon: 'done', message},
      duration: this.defaultSnackbarDuration,
      panelClass: 'snackbar-success'
    });
  }

  openErrorSnackbar(message: string): void {
    this.snackBar.openFromComponent(IconSnackbarComponent, {
      data: {icon: 'error', message},
      duration: this.defaultSnackbarDuration,
      panelClass: 'snackbar-error'
    });
  }
}
