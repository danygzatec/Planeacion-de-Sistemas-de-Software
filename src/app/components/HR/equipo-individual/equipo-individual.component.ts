import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/models/team';
import { ConsultarEquiposComponent } from 'src/app/components/HR/consultar-equipos/consultar-equipos.component'
import { Employee } from 'src/app/models/employee';

import { MatDialog } from  '@angular/material/dialog';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import ExcelData from 'src/excel-dummy.json';
import { EmployeeTeam } from 'src/app/models/employee-team';
import { AddButtonComponent } from '../add-button/add-button.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { EmployeeProject } from 'src/app/models/employee-project';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-equipo-individual',
  templateUrl: './equipo-individual.component.html',
  styleUrls: ['./equipo-individual.component.css']
})
export class EquipoIndividualComponent implements OnInit {

  employees : Employee[];
  empTeams : EmployeeTeam[];
  empProjects : EmployeeProject[];
  teams : Team[];
  projects : Project[];
  team: Team | undefined ;
  id : number;
  evaluators : boolean;


  constructor(
    private route: ActivatedRoute,
    private  dialogRef : MatDialog,
    public navbarActive: NavbarComponent
    ){
    

    this.teams = ExcelData.team;
    this.employees = ExcelData.employee;
    this.empTeams = ExcelData.employee_team
    this.empProjects = ExcelData.employee_project;
    this.projects = ExcelData.project;

    const routeParams = this.route.snapshot.paramMap;
    const empIdFromRoute = Number(routeParams.get('id_employee'));

    this.team = this.teams.find(element => element.id_employee === empIdFromRoute);
    this.id = empIdFromRoute;
    this.evaluators = false;

   }

  async ngOnInit(): Promise<void> {
    await this.createObjects();

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

    this.empProjects.forEach(element => {
      element.employee = this.employees.find(emp => emp.id_employee === element.id_employee);
    })

    this.empTeams.forEach(element => {
      if (element.role_member === 0) {
        element.role_member_string = "leader";
      } else if (element.role_member === 1) {
        element.role_member_string = "peer";
      } else {
        element.role_member_string = "team"
      }
    })
    
  }

  getEmp() {
    return this.employees.find(element => element.id_employee === this.id);
  }

  getEmpName() {
    return this.employees.find(element => element.id_employee === this.id)!.employee_name;
  }

  getMembers() {
    var members : any = [];
    this.empTeams.forEach(element => {
      if (element.id_team == this.team!.id_team) {
        element.employee = this.employees.find(emp => emp.id_employee === element.id_employee);
        
        if (element.role_member === 0) {
          element.role_member_string = "leader";
        } else if (element.role_member === 1) {
          element.role_member_string = "peer";
        } else {
          element.role_member_string = "team"
        }

        members.push(element);
      }
    });
    
    return members;
  }

  getEvaluatorRoles() {

    var members : any = [];
    this.empTeams.forEach(element => {
      if (element.id_team == this.team!.id_team) {
        element.employee = this.employees.find(emp => emp.id_employee === element.id_employee);
        
        if (element.role_member === 0) {
          element.role_member_string = "team";
        } else if (element.role_member === 1) {
          element.role_member_string = "peer";
        } else {
          element.role_member_string = "leader"
        }

        members.push(element);
      }
    });
    
    return members;
  }
  
  setEvaluatorBool() {
    this.evaluators = !this.evaluators
  }

  getEvaluatorBool() {
    return this.evaluators;
  }

  getUnassignedEmployeesInProjects() : any {
    //en esta funcion quiero obtener todos los miembros que no cumplieron las horas
    //en los proyectos del empleado en cuestion.
    var members : any[] = [];

    // lista de id_project en los que trabajó el usuaro en cuestion
    var projectList : any[] = [];

    this.empProjects.forEach(element => {
      if (element.id_employee == this.getEmp()!.id_employee) {
        projectList.push(element.id_project);
      }
    });

    // did_complete sea falso y id_project esté en projectList
    this.empProjects.forEach(element => {
      if (element.did_complete == false && projectList.indexOf(element.id_project) > -1) {
        members.push(element.employee);
        console.log(element.employee?.employee_name);
      }
    })

    return members;

  }

  openDialog(member: any, employee: any){
    this.dialogRef.open(PopupDeleteComponent,{
      data : {
        m : member,
        e: employee
      }
    });
  }

  openDialogAdd(members: any){
    this.dialogRef.open(AddButtonComponent, {
      data : {
        m : members
      }
    });
  }

  navigateBack(page: any){
    console.log(page);
    this.navbarActive.navigate(page);
  }
}
