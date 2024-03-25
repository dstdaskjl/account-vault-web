import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable, switchMap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public get isAuthenticated(): boolean {
    return this.isTokenExpired();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public canActivate(): boolean {
    if (this.isAuthenticated) {
      return true;
    }
    if (localStorage){
      this.router.navigate(['login']);
    }
    return false;
  }

  private isTokenExpired(): any {
    try {
      const token: any = localStorage.getItem('token');
      if (token){
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) < expiry;
      }
      return false;
    } catch(error: any) {
      if (error.message !== 'localStorage is not defined'){
        console.log(error);
      }
    }
  }

  private isUserApproved(username: string): Observable<any> {
    return this.http.get(
      'http://localhost:8000/api/approval/',
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        params: new HttpParams().set('username', username)
      }
    );
  }

  public login(user: {username: string, password: string}): Observable<any> {
    return this.isUserApproved(user.username).pipe(
      switchMap((res: boolean) => {
        if (res === true) {
          return this.http.post(
            'http://localhost:8000/api/token/',
            JSON.stringify(user),
            {
              headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            }
          )
        } else {
          return throwError('Login failed');
        }
      })
    );
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['home']);
  }

  public signUp(data: {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  }): Observable<any> {
    return this.http.post(
      'http://localhost:8000/api/signup/',
      JSON.stringify(data),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }
}
