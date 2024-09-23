import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private router = inject(Router);
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/v1/auth/login';

  constructor() {}

  login(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.baseUrl}`, user)
      .pipe(
        tap((tokens: any) =>
          this.doLoginUser(user.email, JSON.stringify(tokens))
        )
      );
  }

  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  getRole(): string | null {
    let tokens: any = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return null;
  
    const parsedTokens = JSON.parse(tokens);
    return parsedTokens.role ? parsedTokens.role : null;
  }  
}