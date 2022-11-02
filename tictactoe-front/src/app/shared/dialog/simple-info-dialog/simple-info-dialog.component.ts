import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SimpleInfoDialogData } from '../models/SimpleInfoDialogData';

@Component({
  selector: 'app-simple-info-dialog',
  templateUrl: './simple-info-dialog.component.html',
  styleUrls: ['./simple-info-dialog.component.scss']
})
export class SimpleInfoDialogComponent implements OnInit {

  title: string;
  description: string;
  redirectAfterClose: boolean;

  constructor(
    private dialogRef: MatDialogRef<SimpleInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: SimpleInfoDialogData) {
    this.description = data.description;
    this.title = data.title;
    this.redirectAfterClose = data.redirectAfterClose;
  }

  ngOnInit(): void {
  }

}
