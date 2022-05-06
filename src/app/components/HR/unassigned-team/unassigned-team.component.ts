import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeProject } from 'src/app/models/employee-project';
import { EmployeeTeam } from 'src/app/models/employee-team';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import ExcelData from 'src/excel-dummy.json'

@Component({
  selector: 'app-unassigned-team',
  templateUrl: './unassigned-team.component.html',
  styleUrls: ['./unassigned-team.component.css']
})
export class UnassignedTeamComponent implements OnInit {

  team: Team | undefined ;
  teams: Team[];
  employees: Employee[];
  empTeams : EmployeeTeam[];
  empProjects : EmployeeProject[];
  projects : Project[];
  id: number;
  navbarActive: any;

  constructor(private route: ActivatedRoute) {

    this.teams = ExcelData.team
    this.employees = ExcelData.employee;
    this.empTeams = ExcelData.employee_team
    this.empProjects = ExcelData.employee_project;
    this.projects = ExcelData.project;

    const routeParams = this.route.snapshot.paramMap;
    const empIdFromRoute = Number(routeParams.get('id_employee'));

    this.team = this.teams.find(element => element.id_employee === empIdFromRoute);
    this.id = empIdFromRoute;
   }

  ngOnInit(): void {
    this.teams = ExcelData.team
    this.employees = ExcelData.employee;
    this.createObjects();
  }

  async initializeObjects() {
    this.teams = ExcelData.team;
    this.employees = ExcelData.employee;
    this.empTeams = ExcelData.employee_team;
    this.empProjects = ExcelData.employee_project;
    this.projects = ExcelData.project;
  }

  async createObjects() {
    await this.initializeObjects();

    this.empProjects.forEach(ep => {
      ep.project = [];
      var p = this.projects.find(pjct => pjct.id_project === ep.id_project);
      ep.project.push(p!);
      ep.employee = this.employees.find(emp => emp.id_employee === ep.id_employee);
    });
  }

  getName() {
    var e = this.employees.find(element => element.id_employee === this.id);
    return e!.employee_name;
  }

  getMembers() {
    var members : any[] = [];
    var pjcts : any[] = [];

    this.empProjects.forEach(empP => {
      if (empP.id_employee === this.id) {
        pjcts.push(empP.id_project);
      }
    });

    this.empProjects.forEach(element => {
      if (element.did_complete === true && pjcts.indexOf(element.id_project) > -1) {
        members.push(element.employee!.employee_name);
      }
    });

    return members;

  } 

  addTeam() {
    console.log("Aqui se va a crear el equipo :p");
  }

  navigateBack(page: any){
    console.log(page);
    this.navbarActive.navigate(page);
  }

}
