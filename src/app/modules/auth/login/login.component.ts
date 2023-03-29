import { Component } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider, GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user?: User | null;
  isLoggedIn: Observable<Boolean>
  returnUrl?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private socialAuthService: SocialAuthService,
    private authService: AuthService
  ) {
    // Subscribe to Login State
    this.isLoggedIn = this.authService
      .loginState
      .asObservable();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    this.socialAuthService.authState.subscribe((user) => {
      if(user && user.idToken){
        this.authService
          .login(user)
          .then((response) => {
            this.returnUrl
              ? this.router.navigate([this.returnUrl])
              : this.router.navigate(["/profile"]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
}
