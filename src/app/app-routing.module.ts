import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { CrearEquiposComponent } from '../app/components/crear-equipos/crear-equipos.component';
import { ConsultarEquiposComponent } from '../app/components/consultar-equipos/consultar-equipos.component';
import { Evaluacion360Component } from '../app/components/evaluacion360/evaluacion360.component';
import { RouterModule, Routes } from '@angular/router';
import { MsalguardGuard } from './msalguard.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [MsalguardGuard]},
  {path: 'crearEquipos', component: CrearEquiposComponent},
  {path: 'consultarEquipos', component: ConsultarEquiposComponent},
  {path: 'evaluacion360', component: Evaluacion360Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, CrearEquiposComponent, ConsultarEquiposComponent, Evaluacion360Component]