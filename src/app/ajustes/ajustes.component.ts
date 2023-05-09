import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConexionPhpService } from '../conexion-php.service';

import Swal from 'sweetalert2';
//para hacer la llamada de subir
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent {
  constructor(
    private rutaActiva: ActivatedRoute,
    private http: HttpClient,
    private ConexionPhpService: ConexionPhpService
  ) {}

  ulrFotos = 'http://localhost/';
  usuario = {
    correo: '',
    nombre: '',
    apellidos: '',
    sexo: '',
    fecha: '',
    id: '',
    nombreUsuario: '',
    foto: '',
    nuevoCorreo: '',
    contrasenna: '',
    contrasennaConfirmacion: '',
  };
  //paso el id del usuario y guado la extension y el nombre del archivo
  idYFoto = {
    id: '',
    nombre: '',
    extension: '',
  };
  //archivo
  nombreArchivo = '';

  ngOnInit() {
    // Subscribe to the queryParams observable
    this.rutaActiva.queryParams.subscribe((params) => {
      this.usuario.id = params['id'];
    });

    this.comprobarAtleta();
  }

  //subir la foto
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  onFileSelected(event: any) {
    //archivo que recojo
    const file: File = event.target.files[0];

    if (file) {
      if (this.usuario.foto != '') {
        this.BorarFoto();
      }
      //nombre del archivo
      this.nombreArchivo = file.name;
      //formato
      const formData = new FormData();

      formData.append('thumbnail', file);
      //subir el archivo al php
      const upload$ = this.http.post(
        this.ulrFotos + 'michu/subirFotos.php',
        formData
      );

      upload$.subscribe();
    }
  }

  //falta el archivo
  get f() {
    return this.myForm.controls;
  }
  //cuando cambia el input del archivo
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file,
      });
    }
  }
  //subir la foto
  submit() {
    const formData = new FormData();
    const file = this.myForm.get('fileSource')?.value;
    if (file) {
      this.BorarFoto();
      formData.append('file', file);
    }

    this.http
      .post(this.ulrFotos + 'michu/subirFotos.php', formData)
      .subscribe((datos: any) => {
        if (datos['mensaje']) {
          //recoger el nombre de la foto y el id del usuario
          this.idYFoto.id = this.usuario.id;
          this.idYFoto.nombre = datos['id'];
          this.idYFoto.extension = datos['nombreCompleto'];
          this.usuario.foto = this.idYFoto.extension;
          //una vez recogido mando todos estos datos a la bd

          this.ActualizarFoto();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'no se pueden subir archivos de este tipo',
          });
        }
      });
  }

  ActualizarFoto() {
    this.ConexionPhpService.ActualizarFoto(this.idYFoto).subscribe(
      (datos: any) => {
        if (datos['resultado'] == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Foto actualizada correctamente',
            showConfirmButton: false,
            timer: 700,
          });
        }
      }
    );
  }

  //recogo la foto de la bd
  recuperarFoto() {
    this.ConexionPhpService.RecuperarFoto(this.usuario.id).subscribe(
      (datos: any) => {
        this.usuario.foto = datos['mensaje'];
        if (!this.usuario.foto) {
          this.usuario.foto = '';
        }
      }
    );
  }

  BorarFoto() {
    this.ConexionPhpService.BorrarFoto(this.usuario).subscribe(
      (datos: any) => {}
    );
  }

  //recuperar el usuario de la bd
  recuperarUsuario() {
    this.ConexionPhpService.recuperarUsuario(this.usuario.id).subscribe(
      (datos: any) => {
        this.usuario.nombre = datos[1];
        this.usuario.apellidos = datos[2];
        this.usuario.sexo = datos[3] == 1 ? 'Masculino' : 'Femenino';
        this.usuario.fecha = datos[4];
        this.usuario.nombreUsuario = datos[6];
        this.usuario.correo = datos[7];
      }
    );
  }

  //recuperar el usuario de la bd
  recuperarEntrenador() {
    this.ConexionPhpService.recuperarEntrenador(this.usuario.id).subscribe(
      (datos: any) => {
        this.usuario.correo = datos[2];
        this.usuario.foto = datos[1] != null ? datos[2] : '';
      }
    );
  }
  ComprobarCorreo() {
    this.ConexionPhpService.ComprobarCorreo(this.usuario.nuevoCorreo).subscribe(
      (datos: any) => {
        if (datos['resultado'] == 'OK') {
          if (datos['mensaje']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Este correo ya esta en uso',
            });
            return;
          }
          this.actualizarCorreo();
        }
      }
    );
  }

  actualizarCorreo() {
    this.ConexionPhpService.actualizarCorreo(this.usuario).subscribe(
      (datos: any) => {
        if (datos['resultado'] == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Correo actualizado correctamente',
            showConfirmButton: false,
            timer: 700,
          });
          this.usuario.correo = this.usuario.nuevoCorreo;
          this.usuario.nuevoCorreo = '';
        }
      }
    );
  }

  cambiarCorreo() {
    if (!this.usuario.nuevoCorreo) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo del nuevo correo esta vacio',
      });
      return;
    }
    if (this.usuario.nuevoCorreo === this.usuario.correo) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes poner el mismo correo',
      });
      return;
    }

    if (!this.validarcorreo(this.usuario.nuevoCorreo)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El correo tiene que tener por lo menos un @ y . Un ejemplo:  sinestesia@gmail.es',
      });
      return;
    }
    this.ComprobarCorreo();
  }
  validarcorreo(correo: any) {
    //Cualquier string un @ cualquier string un . y finalmente cualquier string
    var re = /\S+@\S+\.\S+/;
    return re.test(correo);
  }

  comprobarContrasenna() {
    if (!this.usuario.contrasenna) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La contraseña no puede estar vacia',
      });
      return;
    }
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[^\dA-Za-z]).{5,}$/.test(
        this.usuario.contrasenna
      )
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La contraseña no cumple con nuestras normas por lo menos tiene que tener 5 caracteres ,una letra mayuscula , una minuscula y un signo especial. Un ejemplo: Sinestesia1!',
      });
      return;
    }
    if (this.usuario.contrasenna !== this.usuario.contrasennaConfirmacion) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no son iguales ',
      });
      return;
    }
    this.comprobarContrasennaBD();
  }

  comprobarContrasennaBD() {
    this.ConexionPhpService.comprobarContrasenna(this.usuario).subscribe(
      (datos: any) => {
        if (datos['resultado'] == 'OK') {
          if (datos['mesaje']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo cambiar por que la contraseña es la misma',
            });
            return;
          }
          this.actualizarContrasenna();
        }
      }
    );
  }

  actualizarContrasenna() {
    this.ConexionPhpService.actualizarContrasenna(this.usuario).subscribe(
      (datos: any) => {
        if (datos['resultado'] == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'La contraseña se  actualizado correctamente',
            showConfirmButton: false,
            timer: 700,
          });
          this.usuario.contrasenna = '';
          this.usuario.contrasennaConfirmacion = '';
        }
      }
    );
  }

  comprobarAtleta() {
    this.ConexionPhpService.comprobarAtleta(this.usuario.id).subscribe(
      (datos: any) => {
        //devuelve true si es atleta false si es un entrenador
        if (datos['mensaje']) {
          this.recuperarFoto();
          this.recuperarUsuario();
        } else {
          this.recuperarEntrenador();
        }
      }
    );
  }
}
