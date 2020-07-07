import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  private URL = 'http://localhost:3000/api';


  getUsuarios(){
    return this.http.get(`${this.URL}/obtener`)
    .pipe(
      map(resp => this.crearArreglo(resp))
    );
  }

  getUsuario( id:string ){
    console.log(id);
    return this.http.get(`${this.URL}/obtener/${id}`);
  }

  private crearArreglo( usuariosObj: object){
    const usuarios: UsuarioModel[] = [];
    if (usuariosObj ===null){ return [];}

    Object.keys(usuariosObj).forEach(key => {
      const usuario: UsuarioModel = usuariosObj[key];
      usuario.id=key;

      usuarios.push(usuario);
    });
    return usuarios;
  }
}

