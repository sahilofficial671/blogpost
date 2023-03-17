import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SocialLoginModule, GoogleSigninButtonModule} from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
