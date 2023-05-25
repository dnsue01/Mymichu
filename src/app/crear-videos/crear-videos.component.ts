import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConexionPhpService } from '../conexion-php.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-crear-videos',
  templateUrl: './crear-videos.component.html',
  styleUrls: ['./crear-videos.component.scss'],
})
export class CrearVideosComponent {
  safeUrl: SafeUrl | null = null;

  constructor(
    private http: HttpClient,
    private rutaActiva: ActivatedRoute,
    private ConexionPhpService: ConexionPhpService,
    public sanitizer: DomSanitizer
  ) {}

  usuario = {
    id: '',
    nombre: '',
    correo: '',
    foto: '',
  };

  video = {
    titulo: '',
    id_entrenador: '',
    url: '',
  };

  videoCorrecto = false;

  ngOnInit(): void {
    this.rutaActiva.queryParams.subscribe((params) => {
      this.usuario.id = params['id'];
      this.video.id_entrenador = this.usuario.id;
    });
  }

  async subirVideo() {
    if (!this.video.titulo) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El video tiene que tener un titulo',
      });
      return;
    }
    if (!this.video.url) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El video tiene que tener una ulr',
      });
      return;
    }
    if (!(await this.comprobarLink())) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El link no es valido prueba otro',
      });
      return;
    }

    this.recortarVideo();
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.video.url
    );

    this.videoCorrecto = true;

    
    this.insertarVideo();
 
  }

  recortarVideo() {
    let str = 'https://youtu.be/';
    let str2 = 'https://www.youtube.com/watch?v=';
    let id_video;
    if (this.video.url.includes('https://youtu.be/')) {
      id_video = this.video.url.substring(str.length);
    } else {
      id_video = this.video.url.substring(str2.length);
    }

    this.video.url = 'https://www.youtube-nocookie.com/embed/' + id_video;
  }

  async comprobarLink(): Promise<boolean> {
    let videoId = this.getVideoId(this.video.url);

    if (videoId == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El enlace del vidadeo esta mal 😖',
      });
      return false;
    }

    let apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyANrARCZVtVJ5ZrPFWx0fq2ZaT-uokl4n0`;

    try {
      let response = (await this.http.get(apiUrl).toPromise()) || '';

      if (response) {
        return true;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El enlace del video esta mal 😖',
        });
        return false;
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El enlace del video esta mal 😖',
      });
      return false;
    }
  }

  getVideoId(url: string): string {
    let videoId: string = '';

    if (
      url.includes('https://youtu.be/') ||
      url.includes('https://www.youtube.com/watch')
    ) {
      if (url.indexOf('youtu.be/') !== -1) {
        // Get the video id from the shortened URL format: https://youtu.be/{videoId}
        videoId = url.split('youtu.be/')[1];
      } else {
        // Get the video id from the regular URL format: https://www.youtube.com/watch?v={videoId}
        let urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get('v') || '';
      }
    }

    return videoId;
  }

  insertarVideo() {
    this.ConexionPhpService.insertarVideo(this.video).subscribe(
      (datos: any) => {
        if (datos['resultado'] == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'video subido correctamente',
            showConfirmButton: false,
            timer: 700,
          });
        }
      }
    );
  }
}
