import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registro(): void {
    this.authService.registro(this.user).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        console.log(res);
        this.router.navigate(['/usuario']);
      },
      (err) => console.log(err)
    );
  }
}
