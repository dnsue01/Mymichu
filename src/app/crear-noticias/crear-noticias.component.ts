import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ConexionPhpService } from '../conexion-php.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-noticias',
  templateUrl: './crear-noticias.component.html',
  styleUrls: ['./crear-noticias.component.scss'],
})
export class CrearNoticiasComponent {
  constructor(
    private rutaActiva: ActivatedRoute,

    private ConexionPhpService: ConexionPhpService
  ) {}
  ngOnInit() {
    // Subscribe to the queryParams observable
    this.rutaActiva.queryParams.subscribe((params) => {
      this.usuario.id = params['id'];
      this.noticia.id_entrenador = this.usuario.id;
    });
    this.changeFormat();
    this.recuperarEntrenador();
  }

  today = new Date();
  pipe = new DatePipe('en-US');

  noticia = {
    titulo: '',
    id_entrenador: '',
    fecha: '',
    texto: '',
  };

  usuario = {
    id: '',
    nombre: '',
    correo: '',
    foto: '',
  };
  urlFotos = 'http://localhost/michu/contenido/';
  changeFormat() {
    let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    let fecha2 = ChangedFormat?.toString()!;
    this.noticia.fecha = fecha2;
  }

  //recuperar el usuario de la bd
  recuperarEntrenador() {
    this.ConexionPhpService.recuperarEntrenador(this.usuario.id).subscribe(
      (datos: any) => {
        this.usuario.nombre = datos[0];
        this.usuario.correo = datos[2];
        this.usuario.foto = datos[1] != null ? datos[1] : '';
      }
    );
  }

  subirNoticia() {
    if (!this.noticia.texto) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se puede subir una nota vacia',
      });
      return;
    }
    if (!this.noticia.titulo) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se puede subir una noticia sin titulo',
      });
      return;
    }

    this.insertarNoticia();
  }

  insertarNoticia() {
    this.ConexionPhpService.insertarNoticia(this.noticia).subscribe(
      (datos: any) => {
        if (datos['resultado'] == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Noticia subida correctamente',
            showConfirmButton: false,
            timer: 700,
          });
        }
      }
    );
  }
}
