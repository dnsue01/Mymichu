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


import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { PerfilComponent } from './perfil/perfil.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { NotasComponent } from './notas/notas.component';

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
    NotasComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
