import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.user).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        console.log(res);
        this.router.navigate(['/usuario']);
      },
      (err) => console.log(err)
    );
  }
}
