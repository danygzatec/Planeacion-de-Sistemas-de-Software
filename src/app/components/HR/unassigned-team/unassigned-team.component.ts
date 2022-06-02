import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeProject } from 'src/app/models/employee-project';
import { EmployeeTeam } from 'src/app/models/employee-team';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import { SqlService } from 'src/app/services/sql.service';
import ExcelData from 'src/excel-dummy.json'
import { createAbstractBuilder } from 'typescript';

@Component({
  selector: 'app-unassigned-team',
  templateUrl: './unassigned-team.component.html',
  styleUrls: ['./unassigned-team.component.css']
})
export class UnassignedTeamComponent implements OnInit {

  public employees: Employee[];
  public empTeams : EmployeeTeam[];
  unassinged : Employee[];
  id: number;
  navbarActive: any;
  currEmployee : any;

  constructor(
    private route: ActivatedRoute, 
    private sql : SqlService) {

    this.employees = [];
    this.empTeams = [];
    this.unassinged = [];


    const routeParams = this.route.snapshot.paramMap;
    const empIdFromRoute = Number(routeParams.get('id_employee'));
    this.id = empIdFromRoute;
   }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {

    this.sql.getEmployees().subscribe((resp) => {
      this.employees = resp;

      this.getUnassigned(this.employees);

    })
  }

  getUnassigned(employees : Employee[]) {
    this.sql.getUnassigned().subscribe((resp) => {
      this.unassinged = resp;
      this.currEmployee = this.unassinged.find(u => u.id === this.id);
      
      this.getUnassignedTeams(employees);
    })
  }

  getUnassignedTeams(employees : Employee[]) {
    this.sql.getUnassignedTeams().subscribe((resp) => {
      this.empTeams = resp;
      this.createObjects(employees, this.empTeams);
    })
  }

  createObjects(employees : Employee[], empTeams : EmployeeTeam[]) {

    empTeams.forEach(et => {
      et.employee = employees.find(emp => emp.id === et.id_employee);
      if (et.employee === undefined) {
        et.employee = this.unassinged.find(u => u.id === et.id_employee);
      }
    });

    this.empTeams.forEach(empT => {
      console.log(empT.employee?.employee_name);
    });

  }

  addTeam() {

    // post al api que haga un insert en Teams
    console.log("Aqui se va a crear el equipo :p");
  }

  navigateBack(page: any){
    console.log(page);
    this.navbarActive.navigate(page);
  }

}
