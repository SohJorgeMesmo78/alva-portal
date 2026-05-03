import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, Observable } from 'rxjs';

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  settings: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5200/api/auth';
  
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Restore user from local storage
    const storedUser = localStorage.getItem('alva_user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(loginData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => {
        localStorage.setItem('alva_token', response.token);
        localStorage.setItem('alva_user', JSON.stringify({
          username: response.username,
          email: response.email,
          settings: response.settings
        }));
        this.currentUserSubject.next(response);
      })
    );
  }

  logout() {
    localStorage.removeItem('alva_token');
    localStorage.removeItem('alva_user');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('alva_token');
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}
