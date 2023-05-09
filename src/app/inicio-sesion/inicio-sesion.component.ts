import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConexionPhpService } from '../conexion-php.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
})
export class InicioSesionComponent {
  constructor(
    private ConexionPhpService: ConexionPhpService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  usuario = {
    correoOnombre: '',
    contrasenna: '',
  };

  //id del usuario
  idUsuario: any;

  iniciarSesion() {
    if (this.usuario.correoOnombre != '') {
      if (this.usuario.contrasenna != '') {
        this.comprobacion();
      } else {
        Swal.fire({
          //campo de la contraseña vacio
          icon: 'error',
          title: 'Oops...',
          text: 'El campo de la contraseña  esta vacio',
        });
      }
    } else {
      //campo de correo vacio
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo del correo esta vacio',
      });
    }
  }

  comprobacion() {
    this.ConexionPhpService.comprobarUsuarioInicio(this.usuario).subscribe(
      (datos: any) => {
        if (datos) {
          this.inicioSesion();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay ninguna cuenta con este nombre o correo porfavor prueba otra vez',
          });
        }
      }
    );
  }

  inicioSesion() {
    this.ConexionPhpService.iniciarSesion(this.usuario).subscribe(
      (datos: any) => {
        if (datos) {
          Swal.fire({
            icon: 'success',
            title: 'Inicio correcto',
            showConfirmButton: false,
            timer: 700,
          });

          //recuperar id del usuario para saber que tipo es
          this.recuperarId();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que la contraseña esta mal ,intentalo otra vez...',
          });
        }
      }
    );
  }

  recuperarId() {
    this.ConexionPhpService.recuperarId(this.usuario).subscribe(
      (datos: any) => {
        if (datos['resultado'] == 'OK') {
          //compruebo que tipo de usuario es
          this.idUsuario = datos['mensaje'];
          this.comprobarAdmin();
        }
      }
    );
  }

  comprobarAdmin() {
    this.ConexionPhpService.comprobarAdmin(this.idUsuario).subscribe(
      (datos: any) => {
        //devuelve true si es administrador false si es un usuario normal
        if (datos['mensaje']) {
          this.entrarAdmin(this.idUsuario);
        } else {
          this.comprobarAtleta();
        }
      }
    );
  }

  comprobarAtleta() {
    this.ConexionPhpService.comprobarAtleta(this.idUsuario).subscribe(
      (datos: any) => {
        //devuelve true si es atleta false si es un entrenador
        if (datos['mensaje']) {
          this.entrarAtleta(this.idUsuario);
        } else {
          this.entrarEntrenador(this.idUsuario);
        }
      }
    );
  }
  entrarAtleta(id: any) {
    this.router.navigate(['/principal', id]);
  }
  entrarAdmin(id: any) {
    this.router.navigate(['/panelControl', id]);
  }
  entrarEntrenador(id: any) {
    this.router.navigate(['/entrenadores', id]);
  }
}
