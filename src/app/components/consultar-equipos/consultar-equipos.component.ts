import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeProject } from 'src/app/models/employee-project';
import { EmployeeTeam } from 'src/app/models/employee-team';
import { Team } from 'src/app/models/team';
import { EvaluationPeriod } from 'src/app/models/evaluation-period';
import { Request } from 'src/app/models/request';
import { Project } from 'src/app/models/project';
import ExcelData from 'src/excel-dummy.json';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-consultar-equipos',
  templateUrl: './consultar-equipos.component.html',
  styleUrls: ['./consultar-equipos.component.css']
})
export class ConsultarEquiposComponent implements OnInit {

  employees : Employee[] = ExcelData.employee;
  evaluationPeriods : EvaluationPeriod[] = ExcelData.evaluation_period;
  teams : Team[] = ExcelData.team;
  projects : Project[] = ExcelData.project;
  requests : Request[] = ExcelData.request;
  empProjects : EmployeeProject[] = ExcelData.employee_project;
  empTeams : EmployeeTeam[] = ExcelData.employee_team;
  

  constructor(public accountInfo : AppComponent ) {
   }

  ngOnInit(): void {}

  getName() : string {
    return this.accountInfo.getNameAccount();
  }

  getMembers() {

    var members : any = [];
    
    // buscamos al employee al que le pertenezca la cuenta en sesion
    var emp = this.employees.find(element => element.employee_name === this.getName());
    console.log(emp);
    var teamOfEmp = this.teams.find(element => element.id_employee === emp?.id_employee);
    console.log(teamOfEmp);

    for (let i = 0; i < this.teams.length; i++) {
      if (this.empTeams[i].id_team == teamOfEmp?.id_team) {
        var x = this.empTeams[i].id_employee;
        members.push(this.employees.find(element => element.id_employee === x));
      }
    }
    return members;
  }

  getMemberNames() {
    var members : Employee[] = this.getMembers();
    var memNames : string[] = [];
    members.forEach(element => {
      memNames.push(element.employee_name);
    });

    return memNames;
  }

}
