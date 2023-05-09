import { Component } from '@angular/core';
import { ConexionPhpService } from '../conexion-php.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  ngOnInit() {
    this.recogerNoticias();
  }

  noticias: any;
  urlFotos = 'http://localhost/michu/contenido/';
  constructor(private ConexionPhpService: ConexionPhpService) {}

  recogerNoticias() {
    this.ConexionPhpService.recogerNoticias().subscribe((datos: any) => {
      this.noticias = datos;
      console.log(datos);
    });
  }
}
