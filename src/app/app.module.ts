import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { RegistroSesionComponent } from './registro-sesion/registro-sesion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';

import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { PerfilComponent } from './perfil/perfil.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { NotasComponent } from './notas/notas.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AdministrarUsuariosComponent } from './administrar-usuarios/administrar-usuarios.component';
import { CrearEntrenadoresComponent } from './crear-entrenadores/crear-entrenadores.component';
import { GestionarMarcasComponent } from './gestionar-marcas/gestionar-marcas.component';
import { EntrenadoresComponent } from './entrenadores/entrenadores.component';
import { BarraEntrenadorComponent } from './barra-entrenador/barra-entrenador.component';
import { CrearNoticiasComponent } from './crear-noticias/crear-noticias.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearVideosComponent } from './crear-videos/crear-videos.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    FrontPageComponent,
    RegistroSesionComponent,
    PaginaPrincipalComponent,
    PanelControlComponent,
    AjustesComponent,
    PerfilComponent,
    NotasComponent,
    ResultadosComponent,
    BarraLateralComponent,
    AdministrarUsuariosComponent,
    CrearEntrenadoresComponent,
    GestionarMarcasComponent,
    EntrenadoresComponent,
    BarraEntrenadorComponent,
    CrearNoticiasComponent,
    DashboardComponent,
    CrearVideosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    MatListModule
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
