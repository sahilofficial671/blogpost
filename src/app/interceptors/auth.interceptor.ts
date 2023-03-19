import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next
      .handle(
        request.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + this.authService.getToken()
          }
        })
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err && err.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login'], {
              queryParams: {
                sessionExpired: true,
                returnUrl: this.router.routerState.snapshot.url,
                message: null,
              }
            });
          }
          return throwError(() => err);
        })
      );
  }
}
