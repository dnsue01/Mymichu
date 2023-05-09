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
import { DashboardComponent } from './dashboard/dashboard.component';

import { CrearEntrenadoresComponent } from './crear-entrenadores/crear-entrenadores.component';
import { GestionarMarcasComponent } from './gestionar-marcas/gestionar-marcas.component';
import { AdministrarUsuariosComponent } from './administrar-usuarios/administrar-usuarios.component';

import { EntrenadoresComponent } from './entrenadores/entrenadores.component';
import { CrearNoticiasComponent } from './crear-noticias/crear-noticias.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent, pathMatch: 'full' },
  { path: 'inicio', component: InicioSesionComponent },
  { path: 'registro', component: RegistroSesionComponent },

  //atletas
  {
    path: 'principal/:id',
    component: PaginaPrincipalComponent,
    children: [
      { path: '', component: ResultadosComponent, pathMatch: 'full' },
      { path: 'ajustes', component: AjustesComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'notas', component: NotasComponent },
      { path: 'resultados', component: ResultadosComponent },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
  //entrenadores
  {
    path: 'entrenadores/:id',
    component: EntrenadoresComponent,
    children: [
      { path: '', component: AjustesComponent, pathMatch: 'full' },
      { path: 'ajustes', component: AjustesComponent },
      { path: 'gestionaraMarcas', component: GestionarMarcasComponent },
      { path: 'crearNoticas', component: CrearNoticiasComponent },
    ],
  },

  //administradores
  {
    path: 'panelControl/:id',
    component: PanelControlComponent,
    children: [
      { path: '', component: AdministrarUsuariosComponent, pathMatch: 'full' },
      { path: 'usuarios', component: AdministrarUsuariosComponent },
      { path: 'crearEntrenadores', component: CrearEntrenadoresComponent },
      { path: 'gestionaraMarcas', component: GestionarMarcasComponent },
    ],
  },
  { path: '**', component: FrontPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
