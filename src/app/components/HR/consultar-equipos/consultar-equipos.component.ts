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
import { elementAt, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { has } from 'lodash';

@Component({
  selector: 'app-consultar-equipos',
  templateUrl: './consultar-equipos.component.html',
  styleUrls: ['./consultar-equipos.component.css']
})

export class ConsultarEquiposComponent implements OnInit {
  public employees: Employee[];
  public teams: Team[];

  searchText: any;

  constructor(public accountInfo: AppComponent, public http: HttpClient) {
    this.employees = [];
    this.teams = [];
  }

  ngOnInit(): void {
    this.getEmp();
    this.getT();
    setTimeout(() => { this.ngOnInit() }, 1000 * 3);
  }

  ngAfterInit() {
    this.getEmp();
    this.getT();
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

  async getT() {
    try {
      this.http.get<any>('http://localhost:8080/api/getTeams').subscribe(response => {
      this.teams = response;
    }, error => {
      console.log(error);
    });
    } catch (error) {
      console.log("ERROR: GetTeams: " + error);
    }
  }

  getName(): string {
    return this.accountInfo.getNameAccount();
  }

  getEmployees() {
    var emp : any = [];

    // EL OBJETO ES TEAM
    this.employees.forEach(employee => {
      var team = this.teams.find(element => element.id_employee === employee.id);
      if (team !== undefined && employee.is_assigned) {
        team.employee = employee;
        emp.push(team);
      }

    })

    return emp;
  }

  fireEvent(e: any) {
    e.preventDefault();
    //console.log('problema en equipo individual');
    return false;
  }


}
