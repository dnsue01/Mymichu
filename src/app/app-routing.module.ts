import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { RegistroSesionComponent } from './registro-sesion/registro-sesion.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { PruebaComponent } from './prueba/prueba.component';
import { PanelControlComponent } from './panel-control/panel-control.component';

const routes: Routes =
  [
    { path: "", component: FrontPageComponent, pathMatch: "full" },
    { path: "inicio", component: InicioSesionComponent },
    { path: "registro", component: RegistroSesionComponent },

    //entrenadores y atletas
    {
      path: "principal/:id", component: PaginaPrincipalComponent,
      children: [
        {
          path: 'prueba', component: PruebaComponent
        },]
    },



    //administradores
    { path: "panelControl/:id", component: PanelControlComponent }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
