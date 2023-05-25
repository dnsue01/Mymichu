import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionPhpService } from '../conexion-php.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
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
    categoria:""
  }

  nombreArchivo = '';
  urlFotos = 'http://michuapp.uberelectronnetwork.cc:8091/michu/contenido/';
  //urlFotos = 'http://localhost/michu/contenido/';

  ngOnInit() {
    // Subscribe to the queryParams observable
    this.route.queryParams.subscribe(params => {
      this.usuario.id = params["id"];
    });
    
    this.recuperarUsuario();
    this.recuperarFoto();
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

  //recuperar el usuario de la bd
  recuperarUsuario() {

    this.ConexionPhpService.recuperarUsuario(this.usuario.id).subscribe((datos: any) => {

      this.usuario.nombre = datos[1];
      this.usuario.apellidos = datos[2];
      this.usuario.sexo =  datos[3]==1 ? "Masculino":"Femenino";
      this.usuario.fecha = datos[4];
      this.usuario.categoria = datos[5];
      this.usuario.nombreUsuario = datos[6];
      this.usuario.correo = datos[7];
    });
  }



}

