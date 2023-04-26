import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionPhpService } from '../conexion-php.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent {
  constructor(private route: ActivatedRoute, private router: Router, private ConexionPhpService: ConexionPhpService) { }

  usuario = {
    correo: "",
    nombre: "",
    apellidos: "",
    sexo: "",
    fecha: "",
    id: "",
    nombreUsuario: "",
    foto: "",
    categoria: ""
  }

  nota = {
    id_usuario: "",
    texto: ""
  }

    //usuarios
    notas: any;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuario.id = params["id"];
    });

    this.recuperarUsuario();
  }




  recuperarUsuario() {

    this.ConexionPhpService.recuperarUsuario(this.usuario.id).subscribe((datos: any) => {
      this.usuario.nombre = datos[1];
      this.usuario.apellidos = datos[2];
      this.usuario.sexo = datos[3] == 1 ? "Masculino" : "Femenino";
      this.usuario.fecha = datos[4];
      this.usuario.categoria = datos[5];
      this.usuario.nombreUsuario = datos[6];
      this.usuario.correo = datos[7];
    });
  }



  subirNota() {
    if (!this.nota.texto) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se puede subir una nota vacia',
      });
      return;
    }
    this.nota.id_usuario = this.usuario.id;
    this.insertarNota()

  }


  insertarNota() {

    this.ConexionPhpService.insertarNota(this.nota).subscribe((datos: any) => {
      if (datos["resultado"] == "OK") {
        Swal.fire({
          icon: 'success',
          title: 'Nota insertada correctamente',
          showConfirmButton: false,
          timer: 700
        })
      }
    });
  }
}
