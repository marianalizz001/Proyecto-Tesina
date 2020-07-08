import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  usuarios: UsuarioModel[] = [];
  us: UsuarioModel[] = [];

  constructor(
    private http: HttpClient,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    this.usuariosService.getUsuarios().subscribe((resp) => {
      this.usuarios = resp;
      console.log(this.usuarios);
    });
    this.usuariosService.getUsuario().subscribe((resp) => {
      this.us = resp;
      console.log(this.us);
    });
  }
}
