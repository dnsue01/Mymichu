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

RecuperarFoto(usuario: any) {
  return this.http.post(`${this.url}recuperarFoto.php`, JSON.stringify(usuario));
}
recuperarUsuario(id: any) {
  return this.http.post(`${this.url}recuperarUsuario.php`, JSON.stringify(id));
}
ActualizarFoto(idYFoto: any) {
  return this.http.post(`${this.url}ActualizarFoto.php`, JSON.stringify(idYFoto));
}
BorrarFoto(usuario: any) {
  return this.http.post(`${this.url}borrarFoto.php`, JSON.stringify(usuario));
}
ComprobarCorreo(correo: any) {
  return this.http.post(`${this.url}comprobarCorreo.php`, JSON.stringify(correo));
}

actualizarCorreo(usuario: any) {
  return this.http.post(`${this.url}actualizarCorreo.php`, JSON.stringify(usuario));
}

comprobarContrasenna(usuario: any) {
  return this.http.post(`${this.url}comprobarContrasenna.php`, JSON.stringify(usuario));
}
actualizarContrasenna(usuario: any) {
  return this.http.post(`${this.url}actualizarContrasenna.php`, JSON.stringify(usuario));
}
insertarNota(nota: any) {
  return this.http.post(`${this.url}insertarNota.php`, JSON.stringify(nota));
}
recuperarNotas(id: any) {
  return this.http.post(`${this.url}recuperarNotas.php`, JSON.stringify(id));
}
borrarNota(id: any) {
  return this.http.post(`${this.url}borrarNota.php`, JSON.stringify(id));
}

}
