import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConexionPhpService } from '../conexion-php.service';

@Component({
  selector: 'app-registro-sesion',
  templateUrl: './registro-sesion.component.html',
  styleUrls: ['./registro-sesion.component.scss']
})
export class RegistroSesionComponent {
  constructor(private ConexionPhpService: ConexionPhpService, private router: Router) { }

  ngOnInit(): void {
  }


  usuario = {
    correo: "",
    nombre: "",
    apellidos: "",
    contrasenna: "",
    contrasennaConfirmacion: "",
    sexo: "",
    fecha: "",
    id: "",
    nombreUsuario: "",
    correoOnombre:""
  }
  sexo: string = "";

  radio(event: any) {

    this.sexo = event.target.value;
    this.usuario.sexo = this.sexo
  }
  Registrarse() {
    if (!this.validarNombre(this.usuario.nombreUsuario)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre de usuario tiene que ser entre 2 y 16 caracteres',
      });
      return;
    }
    if (!this.usuario.nombre) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre no puede estar vacio',
      });
      return;
    }
    if (!this.usuario.apellidos) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Los apellidos no pueden estar vacios',
      });
      return;
    }
    if (!this.validarcorreo(this.usuario.correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El correo tiene que tener por lo menos un @ y . Un ejemplo:  sinestesia@gmail.es',
      });
      return;
    }



    if (!this.usuario.contrasenna) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La contraseña no puede estar vacia',
      });
      return;
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[^\dA-Za-z]).{5,}$/.test(this.usuario.contrasenna)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La contraseña no cumple con nuestras normas por lo menos tiene que tener 5 caracteres ,una letra mayuscula , una minuscula y un signo especial. Un ejemplo: Sinestesia1!',
      });
      return;
    }

    if (this.usuario.contrasenna !== this.usuario.contrasennaConfirmacion) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no son iguales ',
      });
      return;
    }

    if (!this.tiene4AniosAntiguedad(this.usuario.fecha)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El atleta tiene que tener por lo menos 4 años ',
      });
      return;
    }


    let errorMessage = '';
    switch (this.sexo) {
      case '':
        errorMessage = 'Debes de seleccionar un sexo ';
        break;
    }

    if (errorMessage) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      });
      return;
    }

    
    this.comprobacion();


  }

  intro(){
  console.log("hola");
  
  }

  //funciones
  comprobacion() {
    this.ConexionPhpService.comprobarUsuario(this.usuario).subscribe((datos: any) => {
      if (datos) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo o el usuario ya esta en uso por favor utiliza otro',
        })
      } else {
        this.registro();
      }

    });
  }


  //funcion de registro
  registro() {
    this.ConexionPhpService.registro(this.usuario).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {

        Swal.fire({
          icon: 'success',
          title: 'Registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.usuario.correoOnombre = this.usuario.nombreUsuario;
        this.recuperarId()
      }
    });
  }

  recuperarId() {
    this.ConexionPhpService.recuperarId(this.usuario).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        //compruebo que tipo de usuario es 
        this.usuario.id = datos['mensaje']
        this.entrar();

      }

    });

  }


  validarNombre(nombre: any) {
    //Cualquier string de entre 4 y 16
    var re = /.{4,16}$/;
    return re.test(nombre);
  }

  validarcorreo(correo: any) {
    //Cualquier string un @ cualquier string un . y finalmente cualquier string
    var re = /\S+@\S+\.\S+/;
    return re.test(correo);
  }

  comprobarContrasenna(contrasenna: any) {
    //Contraseña de minimo 5 caracteres un simbolo especial y debe incluir mayusculas y minusculas
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    return re.test(contrasenna);
  }

  tiene4AniosAntiguedad(fecha: any) {
    // Obtener la fecha actual
    const hoy = new Date();
    // Obtener la fecha a comparar en formato de objeto Date
    const fechaComparar = new Date(fecha);
    // Restarle 4 años a la fecha actual
    const cuatroAniosAtras = new Date(hoy.getFullYear() - 4, hoy.getMonth(), hoy.getDate());
    // Comparar si la fecha a comparar es anterior a cuatro años atrás
    return fechaComparar < cuatroAniosAtras;
  }



  entrar() {
    this.router.navigate(["/principal", this.usuario.id]);
  }
}
