import { Component } from '@angular/core';
import { ConexionPhpService } from '../conexion-php.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-entrenadores',
  templateUrl: './crear-entrenadores.component.html',
  styleUrls: ['./crear-entrenadores.component.scss'],
})
export class CrearEntrenadoresComponent {
  usuario = {
    correo: '',
    nombreUsuario: '',
    contrasenna: '',
  };

  contasenaOculta = '**********';
  oculta = false;

  constructor(private ConexionPhpService: ConexionPhpService) {}

  ngOnInit() {
    this.generarContraAleatorio();
  }

  cambiarVisible() {
    this.oculta = !this.oculta;
  }

  generarContraAleatorio() {
    var chars =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var string_length = 10;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    this.usuario.contrasenna = randomstring;
  }
  validarcorreo(correo: any) {
    //Cualquier string un @ cualquier string un . y finalmente cualquier string
    var re = /\S+@\S+\.\S+/;
    return re.test(correo);
  }
  validarNombre(nombre: any) {
    //Cualquier string de entre 4 y 16
    var re = /.{4,16}$/;
    return re.test(nombre);
  }

  registar() {
    if (this.usuario.nombreUsuario == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre no puede estar vacio',
      });
      return;
    }

    if (!this.validarcorreo(this.usuario.correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El correo tiene que tener por lo menos un @ y . Un ejemplo:  sinestesia@gmail.es',
      });
      return;
    }
    this.comprobacion();
  }

  comprobacion() {
    this.ConexionPhpService.comprobarUsuario(this.usuario).subscribe(
      (datos: any) => {
        if (datos) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo o el usuario ya esta en uso por favor utiliza otro',
          });
        } else {
          //TODO
          this.registrarEnrtenador();
        }
      }
    );
  }

  registrarEnrtenador() {
    this.ConexionPhpService.registrarEntrenadores(this.usuario).subscribe(
      (datos: any) => {
        if (datos['resultado'] == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Registrado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    );
  }
}
