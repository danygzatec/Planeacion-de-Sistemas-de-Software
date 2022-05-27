import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Team } from 'src/app/models/team';
import { AppComponent } from 'src/app/app.component';
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-consultar-equipos',
  templateUrl: './consultar-equipos.component.html',
  styleUrls: ['./consultar-equipos.component.css']
})

export class ConsultarEquiposComponent implements OnInit {
  public employees: Employee[];
  public teams: Team[];

  searchText: any;

  constructor(
    public accountInfo: AppComponent, 
    public sql : SqlService) {
    this.employees = [];
    this.teams = [];
  }

  ngOnInit(): void {

    this.sql.getEmployees().subscribe((resp) => {
      this.employees = resp;
    })

    this.sql.getTeams().subscribe((resp) => {
      this.teams = resp;
    })

    setTimeout(() => { this.ngOnInit() }, 1000 * 1);
  }

  getEmp() {
    this.sql.getEmployees().subscribe((resp) => {
      this.employees = resp;
    })
  }

  getT() {
    this.sql.getTeams().subscribe((resp) => {
      this.teams = resp;
    })
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
