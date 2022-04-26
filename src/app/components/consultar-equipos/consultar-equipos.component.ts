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

  public employees : Employee[] = ExcelData.employee;
  public evaluationPeriods : EvaluationPeriod[] = ExcelData.evaluation_period;
  public teams : Team[] = ExcelData.team;
  public projects : Project[] = ExcelData.project;
  public requests : Request[] = ExcelData.request;
  public empProjects : EmployeeProject[] = ExcelData.employee_project;
  public empTeams : EmployeeTeam[] = ExcelData.employee_team;
  

  constructor(public accountInfo : AppComponent ) {
   }

  ngOnInit(): void {
    this.createObjects();
  }

  getName() : string {
    return this.accountInfo.getNameAccount();
  }

  createObjects() {
    // por cada empleado, llenar equipos.
    this.employees.forEach( employee => {
      /* Team */
      var team = this.teams.find(element => element.id_employee === employee.id_employee);
      team!.employee = employee; // 1 team pertenece solo a 1 employee.

      var teamPeriod = team?.id_period;
      // 1 team solo es de 1 period
      team!.period = this.evaluationPeriods.find(element => element.id_period === teamPeriod); 

      // /* Project ESTA FALLANDO*/ 
      // var pjct = this.projects.find(element => element.id_employee_leader === employee.id_employee);
      // pjct!.leader = employee; // el project solo tiene 1 lider

      // var projectPeriod = this.evaluationPeriods.find(element => element.id_period === pjct?.id_period);
      // pjct!.period = projectPeriod; // 1 project sucede en 1 period

      /* EmployeeProject */
      var empOfP = this.empProjects.find(element => element.id_employee === employee.id_employee);
      empOfP!.employee = employee;

      var projectsOfEmployee = this.empProjects.find(element => element.id_employee === employee.id_employee);
    })
  }

  createObjectsInProject() {


  }

  getMembers() {

    var members : any = [];
    
    // buscamos al employee al que le pertenezca la cuenta en sesion
    var emp = this.employees.find(element => element.employee_name === this.getName());
    var teamOfEmp = this.teams.find(element => element.id_employee === emp?.id_employee);

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

  getTeams() {

    return this.teams;
  }

  fireEvent(e : any) {
    e.preventDefault();
    console.log('problema en equipo individual');
    return false;
  }

}
