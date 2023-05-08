import { Component } from '@angular/core';
import { ConexionPhpService } from '../conexion-php.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestionar-marcas',
  templateUrl: './gestionar-marcas.component.html',
  styleUrls: ['./gestionar-marcas.component.scss'],
})
export class GestionarMarcasComponent {
  constructor(private ConexionPhpService: ConexionPhpService) {}

  pruebas: any;
  marca_id: any;
  marcas: any;
  ngOnInit() {
    this.recuperarPruebas();
  }
  recuperarPruebas() {
    this.ConexionPhpService.recuperarPruebas().subscribe((datos: any) => {
      this.pruebas = datos;
    });
  }

  seleccionarPrueba(e: any) {
    this.marca_id = e.target.value;
    this.recuperarTodasMarcasPrueba(this.marca_id);
  }

  recuperarTodasMarcasPrueba(marca_id: any) {
    this.ConexionPhpService.recuperarTodasMarcasPrueba(marca_id).subscribe(
      (datos: any) => {
        this.marcas = datos;
        console.log(this.marcas);
      }
    );
  }
  borrarMarca(id: any) {
    this.ConexionPhpService.borrarMarca(id).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        Swal.fire({
          icon: 'success',
          title: 'Marca borrada correctamente',
          showConfirmButton: false,
          timer: 700,
        });
        this.recuperarTodasMarcasPrueba(this.marca_id);
      }
    });
  }
  borarMarca(id: any) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'vas a borrar la marca!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero borrarla!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarMarca(id);
      } else if (
        //si le da a cancelar
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelado!', 'La marca no se borro!', 'info');
      }
    });
  }
}
