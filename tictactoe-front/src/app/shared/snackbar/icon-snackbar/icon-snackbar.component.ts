import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

export interface SnackBarData {
  icon: string;
  message: string;
}

@Component({
  selector: 'app-icon-snackbar',
  templateUrl: './icon-snackbar.component.html',
  styleUrls: ['./icon-snackbar.component.scss']
})
export class IconSnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) { }

  ngOnInit(): void {
  }

}
