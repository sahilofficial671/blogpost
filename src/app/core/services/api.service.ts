import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type"
    }),
  };

  adminUrl = environment.host;

  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(() => error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this.adminUrl + path, { params }).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(this.adminUrl + path, JSON.stringify(body), this.httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(this.adminUrl + path, JSON.stringify(body), this.httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(this.adminUrl + path).pipe(catchError(this.formatErrors));
  }
}
