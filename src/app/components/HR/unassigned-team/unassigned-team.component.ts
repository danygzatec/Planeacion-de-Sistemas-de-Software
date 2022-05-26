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

@Component({
  selector: 'app-unassigned-team',
  templateUrl: './unassigned-team.component.html',
  styleUrls: ['./unassigned-team.component.css']
})
export class UnassignedTeamComponent implements OnInit {

  team: Team | undefined ;
  teams: Team[];
  public employees: Employee[];
  public empTeams : EmployeeTeam[];
  empProjects : EmployeeProject[];
  projects : Project[];
  id: number;
  navbarActive: any;

  constructor(
    private route: ActivatedRoute, 
    private sql : SqlService) {

    this.teams = [];
    this.employees = [];
    this.empTeams = [];
    this.empProjects = [];
    this.projects = [];

    const routeParams = this.route.snapshot.paramMap;
    const empIdFromRoute = Number(routeParams.get('id_employee'));
    this.id = empIdFromRoute;
   }

  ngOnInit(): void {
    this.sql.getEmployees().subscribe((resp) => {
      this.employees = resp;
      console.log("GetEmployees from API successful!");
    })

    this.sql.getTeams().subscribe((resp) => {
      this.teams = resp;
      console.log("GetTeams from API successful!")
    })

    this.sql.getEmployeeTeams().subscribe((resp) => {
      this.empTeams = resp;
    })

    this.sql.getProjects().subscribe((resp) => {
      this.projects = resp;
    })

    this.sql.getEmployeeProjects().subscribe((resp) => {
      this.empProjects = resp;
    })

    this.createObjects();

    this.team = this.teams.find(element => element.id_employee === this.id);

    //setTimeout(() => { this.ngOnInit() }, 1000 * 3);
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

  getEmpT() {
    this.sql.getEmployeeTeams().subscribe((resp) => {
      this.empTeams = resp;
    })
  }

  getProjects() {
    this.sql.getProjects().subscribe((resp) => {
      this.projects = resp;
    })
  }

  getEmployeeProjects() {
    this.sql.getEmployeeProjects().subscribe((resp) => {
      this.empProjects = resp;
    })
  }

  createObjects() {

    this.empProjects.forEach(ep => {
      ep.project = [];
      var p = this.projects.find(pjct => pjct.id === ep.id_project);
      if (p != undefined) {
        ep.project.push(p!);
      }
      
      var e = this.employees.find(emp => emp.id === ep.id_employee);
      if (e != undefined) {
        ep.employee = e;
      }
    });

  }

  getName() : any {
    var e = this.employees.find(element => element.id === this.id);
    if (e != undefined) {
      return e.employee_name;
    }
    
  }

  getMembers() {
    var members : any[] = [];
    var pjcts : any[] = [];

    this.empProjects.forEach(empP => {
      if (empP.id_employee === this.id) {
        if (empP.project != undefined) {
          pjcts.push(empP.project);
        }
      }
    });

    this.empProjects.forEach(element => {
      // encontrar proyecto
      console.log("fuera de pjcs");
      if (pjcts.find(p => p.id === element.id_project)) {
        console.log("dentro de pjcs");
        if (element.did_complete) {
          members.push(element.employee!.employee_name)
          console.log(element.employee!.employee_name);
        }
      }
    });

    return members;

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
