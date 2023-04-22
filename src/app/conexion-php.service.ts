import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConexionPhpService {

  url ="http://localhost/michu/"

  constructor(private http: HttpClient) { }


  registro(usuario: any) {
    return this.http.post(`${this.url}registro.php`, JSON.stringify(usuario));
  }

  iniciarSesion(usuario: any) {
    return this.http.post(`${this.url}iniciarSesion.php`, JSON.stringify(usuario));
  }


  comprobarUsuario(usuario: any) {
    return this.http.post(`${this.url}comprobarUsuario.php`, JSON.stringify(usuario));
  }

  comprobarUsuarioInicio(usuario: any) {
    return this.http.post(`${this.url}comprobarUsuarioInicio.php`, JSON.stringify(usuario));
  }
  comprobarAdmin(id: any) {
    return this.http.post(`${this.url}comprobarAdmin.php`, JSON.stringify(id));
  }
  recuperarId(usuario: any) {
    return this.http.post(`${this.url}recuperarId.php`, JSON.stringify(usuario));
  }
}
