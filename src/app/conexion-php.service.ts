import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ConexionPhpService {
  url = 'http://localhost/michu/';

  constructor(private http: HttpClient) {}

  registro(usuario: any) {
    return this.http.post(`${this.url}registro.php`, JSON.stringify(usuario));
  }

  iniciarSesion(usuario: any) {
    return this.http.post(
      `${this.url}iniciarSesion.php`,
      JSON.stringify(usuario)
    );
  }

  comprobarUsuario(usuario: any) {
    return this.http.post(
      `${this.url}comprobarUsuario.php`,
      JSON.stringify(usuario)
    );
  }

  comprobarUsuarioInicio(usuario: any) {
    return this.http.post(
      `${this.url}comprobarUsuarioInicio.php`,
      JSON.stringify(usuario)
    );
  }
  comprobarAdmin(id: any) {
    return this.http.post(`${this.url}comprobarAdmin.php`, JSON.stringify(id));
  }
  recuperarId(usuario: any) {
    return this.http.post(
      `${this.url}recuperarId.php`,
      JSON.stringify(usuario)
    );
  }

  RecuperarFoto(usuario: any) {
    return this.http.post(
      `${this.url}recuperarFoto.php`,
      JSON.stringify(usuario)
    );
  }
  recuperarUsuario(id: any) {
    return this.http.post(
      `${this.url}recuperarUsuario.php`,
      JSON.stringify(id)
    );
  }
  ActualizarFoto(idYFoto: any) {
    return this.http.post(
      `${this.url}ActualizarFoto.php`,
      JSON.stringify(idYFoto)
    );
  }
  BorrarFoto(usuario: any) {
    return this.http.post(`${this.url}borrarFoto.php`, JSON.stringify(usuario));
  }
  ComprobarCorreo(correo: any) {
    return this.http.post(
      `${this.url}comprobarCorreo.php`,
      JSON.stringify(correo)
    );
  }

  actualizarCorreo(usuario: any) {
    return this.http.post(
      `${this.url}actualizarCorreo.php`,
      JSON.stringify(usuario)
    );
  }

  comprobarContrasenna(usuario: any) {
    return this.http.post(
      `${this.url}comprobarContrasenna.php`,
      JSON.stringify(usuario)
    );
  }
  actualizarContrasenna(usuario: any) {
    return this.http.post(
      `${this.url}actualizarContrasenna.php`,
      JSON.stringify(usuario)
    );
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

  recuperarPruebas() {
    return this.http.get(`${this.url}recuperarPruebas.php`);
  }
  insertarMarca(marca: any) {
    return this.http.post(
      `${this.url}insertarMarca.php`,
      JSON.stringify(marca)
    );
  }

  recogerDistintasPruebasUsuario(id: any) {
    return this.http.post(
      `${this.url}recogerDistintasPruebasUsuario.php`,
      JSON.stringify(id)
    );
  }
  recogerMarcasPorPruebaAtleta(pruebaYAtleta: any) {
    return this.http.post(
      `${this.url}recogerMarcasPorPruebaAtleta.php`,
      JSON.stringify(pruebaYAtleta)
    );
  }

  registrarEntrenadores(usuario: any) {
    return this.http.post(
      `${this.url}registrarEntrenadores.php`,
      JSON.stringify(usuario)
    );
  }

  recuperarEntrenadores() {
    return this.http.get(`${this.url}recuperarEntrenadores.php`);
  }

  recuperarAtletas() {
    return this.http.get(`${this.url}recuperarAtletas.php`);
  }

  borrarUsuraio(id: any) {
    return this.http.post(`${this.url}borrarUsuario.php`, JSON.stringify(id));
  }
  borrarMarca(id: any) {
    return this.http.post(`${this.url}borrarMarca.php`, JSON.stringify(id));
  }
  recuperarTodasMarcasPrueba(id: any) {
    return this.http.post(
      `${this.url}recuperarTodasMarcasPrueba.php`,
      JSON.stringify(id)
    );
  }

  comprobarAtleta(id: any) {
    return this.http.post(`${this.url}comprobarAtleta.php`, JSON.stringify(id));
  }
  recuperarEntrenador(id: any) {
    return this.http.post(
      `${this.url}recuperarEntrenador.php`,
      JSON.stringify(id)
    );
  }
  insertarNoticia(nota: any) {
    return this.http.post(
      `${this.url}insertarNoticia.php`,
      JSON.stringify(nota)
    );
  }
}
