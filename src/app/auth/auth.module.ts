import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { EmailValidatorComponent } from './pages/email-validator/email-validator.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    EmailValidatorComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ]
})
export class AuthModule { }
