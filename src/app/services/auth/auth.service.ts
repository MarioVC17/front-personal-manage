import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../../interfaces/auth-interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public token$ = this.tokenSubject.asObservable();
  public isAuthenticated$ = this.token$.pipe(
    tap(token => console.log('Token changed:', !!token))
  )

  constructor(private _http: HttpClient) { }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, {email, password})
    .pipe(
      tap(response => {
        this.saveToken(response.token)})
    );
  }

  public register(userData: any): Observable<any> {
    return this._http.post(`${environment.apiUrl}/auth/register`, userData);
  }

  private saveToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.tokenSubject.next(token);
  }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
