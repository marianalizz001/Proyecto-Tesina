import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
        console.log(this.user.email);
        this.router.navigate(['/usuario']);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Los datos son incorrectos',
          footer: 'Intentalo de nuevo',
        });
      }
    );
  }
}
