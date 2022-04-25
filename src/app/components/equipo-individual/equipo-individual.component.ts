import { Component, OnInit } from '@angular/core';
import { ConsultarEquiposComponent } from '../consultar-equipos/consultar-equipos.component';

@Component({
  selector: 'app-equipo-individual',
  templateUrl: './equipo-individual.component.html',
  styleUrls: ['./equipo-individual.component.css']
})
export class EquipoIndividualComponent implements OnInit {

  constructor(public consultTeam : ConsultarEquiposComponent) { }

  ngOnInit(): void {
  }

  getName() {
    this.consultTeam.getName();
  }

  getMembers() : any {
    this.consultTeam.getMembers();
  }

}
