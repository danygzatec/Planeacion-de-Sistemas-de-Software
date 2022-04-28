import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';

import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { EquipoIndividualComponent } from './components/equipo-individual/equipo-individual.component';
import { ConsultarEquiposComponent } from './components/consultar-equipos/consultar-equipos.component';
import { UnassignedComponent } from './components/unassigned/unassigned.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { PopupDeleteComponent } from './components/popup-delete/popup-delete.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InboxComponent } from './components/inbox/inbox.component';

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
    InboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
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
    NavbarComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
