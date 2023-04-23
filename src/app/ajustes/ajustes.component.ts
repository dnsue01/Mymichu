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
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent {
  constructor(private rutaActiva: ActivatedRoute, private http: HttpClient, private ConexionPhpService: ConexionPhpService) { }

  usuario = {
    correo: "",
    nombre: "",
    apellidos: "",
    sexo: "",
    fecha: "",
    id: "",
    nombreUsuario: "",
    foto: ""
  }
  //paso el id del usuario y guado la extension y el nombre del archivo
  idYFoto = {
    id: "",
    nombre: "",
    extension: ""
  }
  //archivo
  nombreArchivo = '';
  ngOnInit() {

    // Subscribe to the queryParams observable
    this.rutaActiva.queryParams.subscribe(params => {
      this.usuario.id = params["id"];
    });

    this.recuperarFoto();
  }



  //subir la foto
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  onFileSelected(event: any) {
    //archivo que recojo
    const file: File = event.target.files[0];

    if (file) {
      if (this.usuario.foto != "") {
        this.BorarFoto() 
      }
      //nombre del archivo
      this.nombreArchivo = file.name;
      //formato
      const formData = new FormData();

      formData.append("thumbnail", file);
      //subir el archivo al php
      const upload$ = this.http.post("http://localhost/michu/subirFotos.php", formData);

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
        fileSource: file
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


    this.http.post('http://localhost/michu/subirFotos.php', formData)
      .subscribe((datos: any) => {



        if (datos['mensaje']) {

          //recoger el nombre de la foto y el id del usuario
          this.idYFoto.id = this.usuario.id
          this.idYFoto.nombre = datos['id']
          this.idYFoto.extension = datos['nombreCompleto']
          this.usuario.foto = this.idYFoto.extension;
          //una vez recogido mando todos estos datos a la bd
          this.ActualizarFoto();

        } else {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'no se pueden subir archivos de este tipo',
          })
        }

      })
  }


  ActualizarFoto() {

    this.ConexionPhpService.ActualizarFoto(this.idYFoto).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        Swal.fire({
          icon: 'success',
          title: 'Foto actualizada correctamente',
          showConfirmButton: false,
          timer: 700
        })
      }
    })
  }

  //recogo la foto de la bd
  recuperarFoto() {
    this.ConexionPhpService.RecuperarFoto(this.usuario.id).subscribe((datos: any) => {
      this.usuario.foto = datos['mensaje']
      if (!this.usuario.foto) {
        this.usuario.foto = ""
      }
    })
  }

  BorarFoto() {

    this.ConexionPhpService.BorrarFoto(this.usuario).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        console.log("borrar");

      }
    })
  }
}
