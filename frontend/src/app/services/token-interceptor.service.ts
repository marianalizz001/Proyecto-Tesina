import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req, next) {
    const tokenReq = req.clone({
      setHeaders: {
        Autorization: `Bearer ${this.authService.getToken()}`,
      },
    });
    return next.handle(tokenReq);
  }
}
