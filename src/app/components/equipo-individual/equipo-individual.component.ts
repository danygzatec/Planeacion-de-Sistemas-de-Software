import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/models/team';
import { ConsultarEquiposComponent } from '../consultar-equipos/consultar-equipos.component';

@Component({
  selector: 'app-equipo-individual',
  templateUrl: './equipo-individual.component.html',
  styleUrls: ['./equipo-individual.component.css']
})
export class EquipoIndividualComponent implements OnInit {

  team : Team | undefined;

  constructor(
    private route: ActivatedRoute,
    public consultTeam : ConsultarEquiposComponent
    ){
    
    const routeParams = this.route.snapshot.paramMap;
    const empIdFromRoute = Number(routeParams.get('id_employee'));

    this.team = consultTeam.teams.find(element => element.id_employee === empIdFromRoute);
   }

  ngOnInit(): void {
  }

  getMembers() : any {
    this.consultTeam.getMembers();
  }

}
