import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/models/team';
import { ConsultarEquiposComponent } from 'src/app/components/consultar-equipos/consultar-equipos.component'
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-equipo-individual',
  templateUrl: './equipo-individual.component.html',
  styleUrls: ['./equipo-individual.component.css']
})
export class EquipoIndividualComponent implements OnInit {

  team: Team | undefined ;
  id : number;

  constructor(
    public teamsInfo : ConsultarEquiposComponent,
    private route: ActivatedRoute
    ){
    
    const routeParams = this.route.snapshot.paramMap;
    const empIdFromRoute = Number(routeParams.get('id_employee'));
    this.team = teamsInfo.teams.find(element => element.id_employee === empIdFromRoute);
    this.id = empIdFromRoute;

    console.log(this.team);
   }

  ngOnInit(): void {
  }

  getEmpName() {
    return this.teamsInfo.employees.find(element => element.id_employee === this.id)!.employee_name;
  }

  getMembers() {

    var members : any = [];
    this.teamsInfo.empTeams.forEach(element => {
      if (element.id_team == this.team!.id_team) {
        members.push(this.teamsInfo.employees.find(el => el.id_employee === element.id_employee));
      }
    });

    return members;
  }

}
