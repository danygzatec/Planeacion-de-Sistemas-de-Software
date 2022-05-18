import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { CrearEquiposComponent } from './components/HR/crear-equipos/crear-equipos.component';
import { ConsultarEquiposComponent } from './components/HR/consultar-equipos/consultar-equipos.component';
import { Evaluacion360Component } from './components/HR/evaluacion360/evaluacion360.component';
import { RouterModule, Routes } from '@angular/router';
import { MsalguardGuard } from './msalguard.guard';
import { MsalGuard } from '@azure/msal-angular';
import { DashboardComponent } from './components/HR/dashboard/dashboard.component';
import { EquipoIndividualComponent } from './components/HR/equipo-individual/equipo-individual.component';
import { UnassignedComponent } from './components/HR/unassigned/unassigned.component';
import { AddButtonComponent } from './components/HR/add-button/add-button.component';
import { InboxComponent } from './components/HR/inbox/inbox.component';
import { UploadButtonComponent } from './components/HR/upload-button/upload-button.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { MyprojectsComponent } from './components/Emp/myprojects/myprojects.component';
import { MyteamComponent } from './components/Emp/myteam/myteam.component';
import { ApprovalSuccessfulComponent } from './components/Emp/approval-successful/approval-successful.component';
import { ApprovalUnsuccessfulComponent } from './components/Emp/approval-unsuccessful/approval-unsuccessful.component';
import { PartialApprovalComponent } from './components/Emp/partial-approval/partial-approval.component';
import { UnassignedTeamComponent } from './components/HR/unassigned-team/unassigned-team.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [MsalguardGuard]},
  {path: 'crear-equipos', component: CrearEquiposComponent, canActivate: [MsalguardGuard]},
  {path: 'consultar-equipos', component: ConsultarEquiposComponent, canActivate: [MsalguardGuard]},
  {path: 'evaluacion360', component: Evaluacion360Component, canActivate: [MsalguardGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [MsalguardGuard]},
  {path: 'inbox', component: InboxComponent, canActivate: [MsalguardGuard]},
  {path: 'equipo-individual/:id_employee', component: EquipoIndividualComponent, canActivate: [MsalguardGuard]},
  {path: 'consultar-equipos/unassigned', component: UnassignedComponent, canActivate: [MsalguardGuard]},
  {path: 'view-profile', component: ViewProfileComponent, canActivate: [MsalguardGuard]},
  {path: 'consultar-equipos/unassigned/consultar-equipos', redirectTo: 'consultar-equipos'},
  {path: 'equipo-individual/:id_employee/consultar-equipos', redirectTo: 'consultar-equipos'},
  {path: 'myprojects', component: MyprojectsComponent, canActivate: [MsalguardGuard]},
  {path: 'myteam', component: MyteamComponent, canActivate: [MsalguardGuard]},
  {path: 'approval-successful', component: ApprovalSuccessfulComponent, canActivate: [MsalguardGuard]},
  {path: 'approval-unsuccessful', component: ApprovalUnsuccessfulComponent, canActivate: [MsalguardGuard]},
  {path: 'partial-approval', component: PartialApprovalComponent, canActivate: [MsalguardGuard]},
  {path: 'myteam/partial-approval', pathMatch: 'full', redirectTo: 'partial-approval'},
  {path: 'unassigned-team/:id_employee', component: UnassignedTeamComponent, canActivate: [MsalguardGuard]},
  {path: 'approval-unsuccessful/myteam', pathMatch: 'full', redirectTo: 'myteam'},
  {path: 'unassigned-team/:id_employee/consultar-equipos', pathMatch: 'full', redirectTo: 'consultar-equipos/unassigned'},
  {path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, CrearEquiposComponent, ConsultarEquiposComponent, Evaluacion360Component, DashboardComponent, InboxComponent, EquipoIndividualComponent, UnassignedComponent, AddButtonComponent]