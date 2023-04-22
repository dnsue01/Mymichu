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
import { PruebaComponent } from './prueba/prueba.component';


import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PanelControlComponent } from './panel-control/panel-control.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    FrontPageComponent,
    RegistroSesionComponent,
    PaginaPrincipalComponent,
    PruebaComponent,
    PanelControlComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
