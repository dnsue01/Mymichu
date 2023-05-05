import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-entrenadores',
  templateUrl: './crear-entrenadores.component.html',
  styleUrls: ['./crear-entrenadores.component.scss'],
})
export class CrearEntrenadoresComponent {
  usuario = {
    correo: '',
    nombre: '',
    contrasenna: '',
  };
}
