import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionPhpService } from '../conexion-php.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss'],
})
export class PaginaPrincipalComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ConexionPhpService: ConexionPhpService
  ) {}

  nombreArchivo = '';
  urlFotos = 'http://michuapp.uberelectronnetwork.cc:8091/michu/contenido/';
 // urlFotos = 'http://localhost/michu/contenido/';

  usuario = {
    correo: '',
    nombre: '',
    apellidos: '',
    sexo: '',
    fecha: '',
    id: '',
    nombreUsuario: '',
    foto: '',
  };
  activeButton = '';

  ngOnInit() {
    this.usuario.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.recuperarFoto();

    // Run recuperarFoto() every minute
    interval(6000).subscribe(() => {
      this.recuperarFoto();
    });
  }

  perfil(id: string) {
    this.router.navigate(['perfil'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }

  ajustes(id: string) {
    this.router.navigate(['ajustes'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }
  notas(id: string) {
    this.router.navigate(['notas'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }

  resultados(id: string) {
    this.router.navigate(['resultados'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }

  dashboard(id: string) {
    this.router.navigate(['dashboard'], {
      relativeTo: this.route,
      queryParams: { id },
    });
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
}
