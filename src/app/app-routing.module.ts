import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { RegistroSesionComponent } from './registro-sesion/registro-sesion.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';

import { PanelControlComponent } from './panel-control/panel-control.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NotasComponent } from './notas/notas.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { CrearEntrenadoresComponent } from './crear-entrenadores/crear-entrenadores.component';

import { AdministrarUsuariosComponent } from './administrar-usuarios/administrar-usuarios.component';
const routes: Routes =
  [
    { path: "", component: FrontPageComponent, pathMatch: "full" },
    { path: "inicio", component: InicioSesionComponent },
    { path: "registro", component: RegistroSesionComponent },

    //atletas
    {
      path: "principal/:id", component: PaginaPrincipalComponent,
      children: [
        { path: "", component: AjustesComponent, pathMatch: "full" },
        { path: 'ajustes', component: AjustesComponent },
        { path: 'perfil', component: PerfilComponent },
        { path: 'notas', component: NotasComponent },
        { path: 'resultados', component: ResultadosComponent },
      ]
    },



    //administradores
    { path: "panelControl/:id", component: PanelControlComponent ,
    children: [
      { path: "", component: AdministrarUsuariosComponent, pathMatch: "full" },
      { path: "usuarios", component: AdministrarUsuariosComponent },
      { path: "crearEntrenadores", component: CrearEntrenadoresComponent },

    ]},
    { path: "**", component: FrontPageComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
