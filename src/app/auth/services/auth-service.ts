import { Injectable, signal } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {ProfileResponse} from '../interfaces/my-profile-info';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = "http://localhost:5107/api";
  private currentUserSubject = new BehaviorSubject<any>(null)
  public currentUser$ = this.currentUserSubject.asObservable();

  public isLoggedIn = signal(false);

  constructor(private http: HttpClient) {
    this.loadUserFromToken();
  }

  private loadUserFromToken() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const user = this.decodeJwt(token);
      this.currentUserSubject.next(user);
      this.isLoggedIn.set(true);
    }
  }

  getCurrentUserInfo(){
    return this.http.get<ProfileResponse>(`${this.API_URL}/Auth/profile`).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.currentUserSubject.next(response.data);
          console.log(response.data);
        }
      })
    );
  }

  private decodeJwt(token: string){
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    }
    catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ result: string }>(
      `${this.API_URL}/Auth/login`,
      { email, password }
    ).pipe(
      tap(response => {
        const token = response.result?.trim();
        if (token && token.split('.').length === 3) {
          localStorage.setItem('auth_token', token);
          const user = this.decodeJwt(token);
          this.currentUserSubject.next(user);
          this.isLoggedIn.set(true);
        } else {
          console.error('Otrzymany token nie jest poprawnym JWT');
        }
      })
    );
  }

  register(firstName: string, lastName: string, email: string, password:string, roleType:number)
  {
    return this.http.post(`${this.API_URL}/Auth/register`, {firstName, lastName, email, password, roleType}, {responseType: 'text'})
  }

  logout(){
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
    this.isLoggedIn.set(false);
  }

  getCurrentUser(){
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isTeacher(): boolean {
    const user = this.currentUserSubject.value;
    if (user && user.RoleType === 'Teacher') {
      return true;
    }
    return false;
  }
}
