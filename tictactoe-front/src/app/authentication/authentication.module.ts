import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from "@angular/material/card";
import { SharedModule } from "../shared/shared.module";
import { ExtendedModule, FlexModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgxTrimDirectiveModule } from "ngx-trim-directive";
import { MatButtonModule } from "@angular/material/button";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    SharedModule,
    FlexModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxTrimDirectiveModule,
    MatButtonModule,
    ExtendedModule
  ]
})
export class AuthenticationModule { }
