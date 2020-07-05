import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(user): Observable<any> {
    return this.http.post<any>(this.URL + '/login', user);
  }

  logueado(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token');
    this.router.navigate(['/home']);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
