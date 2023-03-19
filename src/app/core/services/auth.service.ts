import { Injectable } from '@angular/core';
import {SocialAuthService} from '@abacritt/angularx-social-login'
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, firstValueFrom } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginState = new BehaviorSubject<Boolean>(false);
  userState = new BehaviorSubject<User|null>(this.getUser());

  tokenKey: string = 'accessToken';
  userKey: string = 'user';

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {
  }

  async login(user: any){
    const response = {
      isLoggedIn: null,
      user: null,
      message: null,
    };

    try {
      const data = await firstValueFrom(this.apiService.post('/auth/login', {
        user
      }));

      if(data != null && data['user'] && data['accessToken']){
        // Set Access Token
        localStorage.setItem(this.tokenKey, data['accessToken']);

        // Parse & Set User
        const user = this.userService.mapToUser(data['user']);

        localStorage.setItem(this.userKey, JSON.stringify(user));

        this.loginState.next(true);
        this.userState.next(user);

        return {
          user,
          isLoggedIn: Boolean(user && user.getId() && this.tokenExists() && this.userExists()),
          message: null,
        }
      }

      return response;
    } catch (e) {
      return {
        user: null,
        isLoggedIn: null,
        message: e,
      }
    }
  }

  logout(): Boolean{
    localStorage.setItem(this.userKey, "");
    localStorage.setItem(this.tokenKey, "");
    this.loginState.next(false);
    this.userState.next(null);
    return true;
  }

  isLoggedIn(): Boolean{
    if((this.tokenExists() && this.userExists())){
      this.loginState.next(true);
      this.userState.next(this.getUser());

      return true;
    }

    this.loginState.next(false);
    this.userState.next(null);
    return false;
  }

  getUser(): User|null{
    return this.userService.mapToUser(localStorage.getItem(this.userKey));
  }

  tokensExist(): Boolean{
    return this.tokenExists() && this.userExists();
  }

  tokenExists(): Boolean{
    return Boolean(localStorage.getItem(this.tokenKey));
  }

  getToken(): string|null {
    return localStorage.getItem(this.tokenKey);
  }

  userExists(): Boolean{
    return Boolean(localStorage.getItem(this.userKey));
  }
}
