import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { CrearEquiposComponent } from '../app/components/crear-equipos/crear-equipos.component';
import { ConsultarEquiposComponent } from '../app/components/consultar-equipos/consultar-equipos.component';
import { Evaluacion360Component } from '../app/components/evaluacion360/evaluacion360.component';
import { RouterModule, Routes } from '@angular/router';
import { MsalguardGuard } from './msalguard.guard';
import { MsalGuard } from '@azure/msal-angular';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EquipoIndividualComponent } from './components/equipo-individual/equipo-individual.component';
import { UnassignedComponent } from './components/unassigned/unassigned.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [MsalguardGuard]},
  {path: 'crear-equipos', component: CrearEquiposComponent, canActivate: [MsalguardGuard]},
  {path: 'consultar-equipos', component: ConsultarEquiposComponent, canActivate: [MsalguardGuard]},
  {path: 'evaluacion360', component: Evaluacion360Component, canActivate: [MsalguardGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [MsalguardGuard]},
  {path: 'equipo-individual/:id_employee', component: EquipoIndividualComponent, canActivate: [MsalguardGuard]},
  {path: 'consultar-equipos/unassigned', component: UnassignedComponent, canActivate: [MsalguardGuard]},
  {path: 'consultar-equipos/unassigned/consultar-equipos', redirectTo: 'consultar-equipos'},
  {path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, CrearEquiposComponent, ConsultarEquiposComponent, Evaluacion360Component, DashboardComponent, EquipoIndividualComponent, UnassignedComponent]