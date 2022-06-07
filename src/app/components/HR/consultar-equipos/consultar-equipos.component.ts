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
  public assignedTeams : Team[];

  searchText: any;

  constructor(
    public accountInfo: AppComponent, 
    public sql : SqlService) {
    this.employees = [];
    this.teams = [];
    this.assignedTeams = [];
  }

  ngOnInit(): void {

    this.getEmp();
  }

  getEmp() {
    this.sql.getEmployees().subscribe((resp) => {
      this.employees = resp;
      this.getT(this.employees);
    })
  }

  getT(employees : Employee[]) {
    this.sql.getTeams().subscribe((resp) => {
      this.teams = resp;
      this.createObjects(employees, this.teams);
    })
  }

  getName(): string {
    return this.accountInfo.getNameAccount();
  }

  createObjects(employees : Employee[], teams : Team[]) {

    // EL OBJETO ES TEAM
    teams.forEach(t => {
      var e = employees.find(emp => emp.id === t.id_employee);

      if (e !== undefined) {
        t.employee = e;
      }

      if (e?.is_assigned) {
        this.assignedTeams.push(t);
      }
    })
    
  }

  fireEvent(e: any) {
    e.preventDefault();
    //console.log('problema en equipo individual');
    return false;
  }


}
