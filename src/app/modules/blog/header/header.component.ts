import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-blog-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: Observable<Boolean>
  userState: Observable<User|null>
  user?: User | null;

  componentUrl?: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
  ){

    // Refresh Logged In & User States
    this.authService.isLoggedIn();

    // Subscribe to Login State
    this.isLoggedIn = this.authService.loginState.asObservable();

    // Get User from Subscribed User State
    this.authService
      .userState
      .subscribe((user) => this.user = user);

    // Subscribe to User State
    this.userState = this.authService
      .userState
      .asObservable();
  }

  ngOnInt(){
  }

  logout(): any {
    this.authService.logout();
    this.socialAuthService.signOut();
    this.router.navigate(['/login']);
  }
}
