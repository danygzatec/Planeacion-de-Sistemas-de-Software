import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CrearEquiposComponent } from './crear-equipos/crear-equipos.component';
import { ConsultarEquiposComponent } from './consultar-equipos/consultar-equipos.component';
import { Evaluacion360Component } from './evaluacion360/evaluacion360.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CrearEquiposComponent,
    ConsultarEquiposComponent,
    Evaluacion360Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
