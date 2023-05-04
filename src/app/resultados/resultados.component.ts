import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import Chart from 'chart.js/auto';

import { ActivatedRoute, Router } from '@angular/router';
import { ConexionPhpService } from '../conexion-php.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  @ViewChild('myChart', { static: true }) myChart!: ElementRef;


  constructor(private route: ActivatedRoute, private router: Router, private ConexionPhpService: ConexionPhpService) { }


  usuario = {
    correo: '',
    nombre: '',
    apellidos: '',
    sexo: '',
    fecha: '',
    id: '',
    nombreUsuario: '',
    foto: '',
    categoria: '',
  };

  pruebas: any;
  pruebasAtleta: any;

  resultados: any;

  pruebaYAtleta = {
    prueba: "",
    id_atleta: ""
  }
  pruebaTexto: any = ""

  marca = {
    id_atleta: '',
    id_prueba: '',
    marca: '',
  };
  config = {
    type: 'line',
    data: [],
  };

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.usuario.id = params['id'];
    });

    this.recuperarUsuario();
    this.recuperarPruebas();
    this.recogerDistintasPruebasUsuario();
  }

  recuperarUsuario() {
    this.ConexionPhpService.recuperarUsuario(this.usuario.id).subscribe(
      (datos: any) => {
        this.usuario.nombre = datos[1];
        this.usuario.apellidos = datos[2];
        this.usuario.sexo = datos[3] == 1 ? 'Masculino' : 'Femenino';
        this.usuario.fecha = datos[4];
        this.usuario.categoria = datos[5];
        this.usuario.nombreUsuario = datos[6];
        this.usuario.correo = datos[7];
      }
    );
  }

  recuperarPruebas() {
    this.ConexionPhpService.recuperarPruebas().subscribe((datos: any) => {
      this.pruebas = datos;
    });
  }
  seleccionarPrueba(e: any) {
    this.marca.id_prueba = e.target.value
    this.pruebaYAtleta.prueba = e.target.options[e.target.selectedIndex].textContent;

  }

  seleccionarPruebaDetalle(e: any) {
    this.pruebaYAtleta.prueba = e.target.value

   this.pruebaYAtleta.id_atleta = this.usuario.id
    
    this.recogerMarcasPorPruebaAtleta(this.pruebaYAtleta);


  }
  subirMarca() {
    if (!this.marca.marca || this.marca.marca == '0') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se puede subir un resultado vacio o de un valor inaducuado',
      });
      return;
    }
    if (!parseInt(this.marca.marca) || parseInt(this.marca.marca) < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El valor de la marca tiene que ser numerico mayor que 0',
      });
      return;
    }
    if (this.marca.id_prueba == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes de escoger una prueba',
      });
      return;
    }

    this.marca.id_atleta = this.usuario.id;

    this.insertarMarca();
    this.recogerDistintasPruebasUsuario();
  }

  chartData: any = {};

  insertarMarca() {
    this.ConexionPhpService.insertarMarca(this.marca).subscribe((datos: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Marca insertada correctamente',
        showConfirmButton: false,
        timer: 700
      })

      this.recogerDistintasPruebasUsuario();

      console.log(this.pruebaTexto );
      console.log(this.pruebaYAtleta.prueba);
      

      if (this.pruebaTexto == this.pruebaYAtleta.prueba) {
        this.recogerMarcasPorPruebaAtleta(this.pruebaYAtleta)
      }
    });




  }

  recogerDistintasPruebasUsuario() {
    this.ConexionPhpService.recogerDistintasPruebasUsuario(
      this.usuario.id
    ).subscribe((datos: any) => {
      this.pruebasAtleta = datos;
    });
  }

  recogerMarcasPorPruebaAtleta(pruebaYAtleta: any) {
    this.ConexionPhpService.recogerMarcasPorPruebaAtleta(
      pruebaYAtleta
    ).subscribe((datos: any) => {
      let fechas = datos.map((item: any) => item.fecha);
      let marcas = datos.map((item: any) => item.marca);
      this.updateChart(pruebaYAtleta.prueba, fechas, marcas);
    });
  }

  creaChart(prueba: string, fechas: any[], marcas: any[]) {
    const chartId = `0`; // generate unique ID for the chart
    const existingChart = this.chartData[chartId];
    if (existingChart) {
      existingChart.destroy(); // destroy previous chart if it exists
    }
    const ctx = this.myChart.nativeElement.getContext('2d');
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: fechas,
        datasets: [
          {
            label: prueba,
            data: marcas,
            fill: false,
            borderColor: '#4bc0c0',
          },
        ],
      },
    };
    this.chartData[chartId] = new Chart(ctx, config);
  }

  updateChart(prueba: string, fechas: any[], marcas: any[]) {
    const ctx = this.myChart.nativeElement.getContext('2d');
    const chartId = `0`; // generate unique ID for the chart
    const existingChart = this.chartData[chartId];
    if (existingChart) {
      existingChart.destroy(); // destroy previous chart if it exists
    }
  }
  



  resetChartData() {
    this.chartData = {};
  }
}
