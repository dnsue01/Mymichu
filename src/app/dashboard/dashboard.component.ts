import { Component } from '@angular/core';
import { ConexionPhpService } from '../conexion-php.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  ngOnInit() {
    this.recogerNoticias();
    this.recogerVideos();
  }

  noticias: any;
  videos: any;
  palabraBuscada: any;
  urlFotos = 'http://localhost/michu/contenido/';
  constructor(
    private ConexionPhpService: ConexionPhpService,
    private sanitizer: DomSanitizer
  ) {}

  recogerNoticias() {
    this.ConexionPhpService.recogerNoticias().subscribe((datos: any) => {
      this.noticias = datos;
    });
  }

  recogerVideos() {
    this.ConexionPhpService.recogerVideos().subscribe((datos: any) => {
      let videosN = [];
      for (let index = 0; index < datos.length; index++) {
        const url = datos[index][2];
        let videoUrl = this.getSafeUrl(url);

        let video = {
          id: datos[index][0],
          id_entrenador: datos[index][1],
          url: videoUrl,
          titulo: datos[index][3],
        };

        videosN.push(video);
      }
      this.videos = videosN;
    });
  }
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  buscarVideos() {
    console.log(this.palabraBuscada);

    this.ConexionPhpService.buscarVideos(this.palabraBuscada).subscribe(
      (datos: any) => {
        let videosN = [];
        for (let index = 0; index < datos.length; index++) {
          const url = datos[index][2];
          let videoUrl = this.getSafeUrl(url);

          let video = {
            id: datos[index][0],
            id_entrenador: datos[index][1],
            url: videoUrl,
            titulo: datos[index][3],
          };

          videosN.push(video);
        }
        this.videos = videosN;
      }
    );
  }
}
