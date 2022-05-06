import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';

import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { EquipoIndividualComponent } from './components/HR/equipo-individual/equipo-individual.component';
import { ConsultarEquiposComponent } from './components/HR/consultar-equipos/consultar-equipos.component';
import { UnassignedComponent } from './components/HR/unassigned/unassigned.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PopupDeleteComponent } from './components/HR/popup-delete/popup-delete.component';
import { AddButtonComponent } from './components/HR/add-button/add-button.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InboxComponent } from './components/HR/inbox/inbox.component';
import { UploadButtonComponent } from './components/HR/upload-button/upload-button.component';
import { CrearEquiposComponent } from './components/HR/crear-equipos/crear-equipos.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';

import { LOCALE_ID } from '@angular/core';
import { NavbarEmployeeComponent } from './components/shared/navbar-employee/navbar-employee.component';
import { MyprojectsComponent } from './components/Emp/myprojects/myprojects.component';
import { MyteamComponent } from './components/Emp/myteam/myteam.component';
import { PartialApprovalComponent } from './components/Emp/partial-approval/partial-approval.component';
import { ApprovalSuccessfulComponent } from './components/Emp/approval-successful/approval-successful.component';
import { ApprovalUnsuccessfulComponent } from './components/Emp/approval-unsuccessful/approval-unsuccessful.component';
import { AddButtonEmpComponent } from './components/Emp/add-button-emp/add-button-emp.component';
import { PopupDeleteEmpComponent } from './components/Emp/popup-delete-emp/popup-delete-emp.component';
import { Ng2SearchPipeModule} from 'ng2-search-filter';

export function MSALInstanceFactory() : IPublicClientApplication{
  return new PublicClientApplication({
    auth : {
      clientId: '86e9d79b-69c1-45b6-93fa-1c40818201d0',
      redirectUri: 'http://localhost:4200'
    }
  })
}

@NgModule({
  declarations: [ 
    AppComponent,
    routingComponents,
    NavbarComponent,
    UnassignedComponent,
    PopupDeleteComponent,
    AddButtonComponent,
    InboxComponent,
    ViewProfileComponent,
    NavbarEmployeeComponent,
    MyprojectsComponent,
    MyteamComponent,
    PartialApprovalComponent,
    ApprovalSuccessfulComponent,
    ApprovalUnsuccessfulComponent,
    UploadButtonComponent,
    AddButtonEmpComponent,
    PopupDeleteEmpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule

  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService,
    ConsultarEquiposComponent,
    HttpClient,
    FormBuilder,
    NavbarComponent,
    CrearEquiposComponent,
    AppComponent,
    InboxComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
