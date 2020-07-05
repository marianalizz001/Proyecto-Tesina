import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.logueado()) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
