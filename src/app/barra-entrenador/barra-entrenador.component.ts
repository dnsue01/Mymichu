import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionPhpService } from '../conexion-php.service';
@Component({
  selector: 'app-barra-entrenador',
  templateUrl: './barra-entrenador.component.html',
  styleUrls: ['./barra-entrenador.component.scss'],
})
export class BarraEntrenadorComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
  ngOnInit() {
    this.usuario.id = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ajustes(id: string) {
    this.router.navigate(['ajustes'], {
      relativeTo: this.route,
      queryParams: { id },
    });
  }
}
