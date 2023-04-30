import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionPhpService } from '../conexion-php.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent {

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

  pruebas: any

  marca = {
    id_atleta: "",
    id_prueba: "",
    marca: ""
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuario.id = params["id"];
    });

    this.recuperarUsuario();
    this.recuperarPruebas();
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


  recuperarPruebas() {
    this.ConexionPhpService.recuperarPruebas().subscribe((datos: any) => {
      this.pruebas = datos
    });
  }
  seleccionarPrueba(e: any) {
    this.marca.id_prueba = e.target.value
  }



  subirMarca() {

    if (!this.marca.marca || this.marca.marca == "0") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se puede subir un resultado vacio o de un valor inaducuado',
      });
      return;
    }
    if (!parseInt(this.marca.marca) || parseInt(this.marca.marca)<0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El valor de la marca tiene que ser numerico mayor que 0',
      });
      return;
    }
    if (this.marca.id_prueba == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes de escoger una prueba',
      });
      return;
    }

  }
}

