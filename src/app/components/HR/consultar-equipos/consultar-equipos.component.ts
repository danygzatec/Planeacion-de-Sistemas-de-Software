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
import { elementAt } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultar-equipos',
  templateUrl: './consultar-equipos.component.html',
  styleUrls: ['./consultar-equipos.component.css']
})

export class ConsultarEquiposComponent implements OnInit {
  public employees: Employee[];
  // public teams: Team[];
  // public teamsCreated : boolean;

  searchText: any;

  constructor(public accountInfo: AppComponent, public http: HttpClient) {
    this.employees = [];
    // this.teams = [];
    // this.teamsCreated = false;
  }

  async ngOnInit(): Promise<void> {
    await this.getEmp();
    // await this.getT();
    // await this.createObjects();
    // this.teamsCreated = true;
  }

  async getEmp() {
    try {
      this.http.get<any>('http://localhost:8080/api/getEmployees').subscribe(response => {
        this.employees = response;
      }, error => {
        console.log(error);
      });
    } catch (error) {
      console.log("ERROR: GetEmployees: " + error);
    }
  }

  // async getT() {
  //   try {
  //     this.http.get<any>('http://localhost:8080/api/getTeams').subscribe(response => {
  //     this.teams = response;
  //     console.log("api:" + response);
  //   }, error => {
  //     console.log(error);
  //   });
  //   } catch (error) {
  //     console.log("ERROR: GetEmployees: " + error);
  //   }
  // }

  getName(): string {
    return this.accountInfo.getNameAccount();
  }

  // async createObjects() {
  //   this.employees.forEach( employee => {
  //     var team = this.teams.find(element => element.id_employee === employee.id_employee);
  //     if (team != undefined) {
  //       team.employee = employee; // 1 team solo pertenece a 1 employee.
  //     }});
  //     console.log(this.teams);
  //   }

  // async createObjects() {

  //   // esperamos a que se inicialicen los objetos
  //   await this.initializeObjects();

  //   // por cada empleado, llenar equipos.
  //   this.employees.forEach( employee => {
  //     /* Team */
  //     var team = this.teams.find(element => element.id_employee === employee.id_employee);
  //     if (team != undefined) {
  //       team.employee = employee; // 1 team solo pertenece a 1 employee.
  //       var teamPeriod = team.id_period;
  //       team.period = this.evaluationPeriods.find(element => element.id_period === teamPeriod); // 1 team es de solo 1 period
  //     }

  //     // /* Project ESTA FALLANDO*/ 
  //     // var pjct = this.projects.find(element => element.id_employee_leader === employee.id_employee);
  //     // pjct!.leader = employee; // el project solo tiene 1 lider

  //     // var projectPeriod = this.evaluationPeriods.find(element => element.id_period === pjct?.id_period);
  //     // pjct!.period = projectPeriod; // 1 project sucede en 1 period

  //     /* EmployeeProject */
  //     var empOfP = this.empProjects.find(element => element.id_employee === employee.id_employee);
  //     if (empOfP != undefined) {
  //       empOfP.employee = employee;
  //     }

  //     //var projectsOfEmployee = this.empProjects.find(element => element.id_employee === employee.id_employee);

  //     /* EmployeeTeam*/
  //     this.empTeams.forEach(element => {
  //       if (element.id_employee === employee.id_employee) {
  //         element.employee = employee;
  //       }
  //     });
  //   });
  // }


  // getMembers() {

  //   var members : any = [];

  //   // buscamos al employee al que le pertenezca la cuenta en sesion
  //   var emp = this.employees.find(element => element.employee_name === this.getName());
  //   var teamOfEmp = this.teams.find(element => element.id_employee === emp?.id_employee);

  //   for (let i = 0; i < this.teams.length; i++) {
  //     if (this.empTeams[i].id_team == teamOfEmp?.id_team) {
  //       var x = this.empTeams[i].id_employee;
  //       members.push(this.employees.find(element => element.id_employee === x));
  //     }
  //   }
  //   return members;
  // }

  // getMemberNames() {
  //   var members : Employee[] = this.getMembers();
  //   var memNames : string[] = [];
  //   members.forEach(element => {
  //     memNames.push(element.employee_name);
  //   });

  //   return memNames;
  // }

  // getEmployees() {
  //   var emp : any = [];

  //   // EL OBJETO ES TEAM
  //   this.employees.forEach(element => {
  //     var t = this.teams.find(team => team.id_employee === element.id_employee);
  //     if (element.is_assigned && t != undefined) {
  //       t.employee = element;
  //       emp.push(t);
  //     }

  //   })

  //   console.log("TEAMS: " + emp);

  //   return emp;
  //

  getEmployees() {
    var emp : Employee[] = [];

    this.employees.forEach(element => {
      if (element.is_assigned === true) {
        emp.push(element);
      }
    })

    return emp;
  }

  fireEvent(e: any) {
    e.preventDefault();
    //console.log('problema en equipo individual');
    return false;
  }

  // getTeamsCreated() {
  //   return this.teamsCreated;
  // }

  // async setRoles() {
  //   this.empTeams.forEach(element => {
  //     if (element.role_member === 0) {
  //       element.role_member_string = "leader";
  //     } else if (element.role_member === 1) {
  //       element.role_member_string = "peer";
  //     } else {
  //       element.role_member_string = "team";
  //     }
  //   })
  // }

}
