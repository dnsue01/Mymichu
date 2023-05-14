import { Component } from '@angular/core';
import { ConexionPhpService } from '../conexion-php.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.scss']
})
export class AdministrarUsuariosComponent {

  constructor(private ConexionPhpService: ConexionPhpService) { }

  atletas: any;
  entrenadores: any;
  urlFotos = 'http://michuapp.uberelectronnetwork.cc:8091/michu/contenido/';

  ngOnInit() {
    this.recuperarAltetas();
    this.recuperarEntrenadores();
  }

  recuperarAltetas() {
    this.ConexionPhpService.recuperarAtletas().subscribe((datos: any) => {
      this.atletas = datos;
    });
  }
  recuperarEntrenadores() {
    this.ConexionPhpService.recuperarEntrenadores().subscribe((datos: any) => {
      this.entrenadores = datos;
    });
  }

  infoAtleta(atleta: any) {
  let foto;
    if(atleta.foto_perfil == null){
      foto = "assets/defaultProfile.png"
    }else{
      foto = this.urlFotos+atleta.foto_perfil
    }
    Swal.fire({
      imageUrl: foto,
      imageHeight: 150,
      imageWidth: 200,
      title:atleta[3] +" "+ atleta.apellidos,
      text:atleta[2],
      html:
      '<b>'+atleta[2]+'</b> ' +
      '<br>' +
      '<b>'+atleta.nombre+'</b> ' +
      '<br>' +
      '<b>'+atleta.fecha_nacimiento+'</b>' 
      ,
    })

  }



  borrar(id:any){
      Swal.fire({
  
        title: '¿Estas seguro?',
        text: "vas a borrar el usuario!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, quiero borrarlo!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
  
          this.borrarUsuarioBd(id)
        } else if (
          //si le da a cancelar
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelado!',
            'El usuario no se borro!',
            'info'
          )
        }
      })
    }
    borrarUsuarioBd(id:any){
      this.ConexionPhpService.borrarUsuraio(id).subscribe((datos: any) => {
        if (datos["resultado"] == "OK") {
          Swal.fire({
            icon: 'success',
            title: 'Nota borrada correctamente',
            showConfirmButton: false,
            timer: 700
          })
          this.recuperarEntrenadores()
          this.recuperarAltetas()
        }
      });
    }
    
  

}
