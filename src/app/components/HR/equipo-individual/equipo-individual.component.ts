import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/models/team';
import { ConsultarEquiposComponent } from 'src/app/components/HR/consultar-equipos/consultar-equipos.component'
import { Employee } from 'src/app/models/employee';

import { MatDialog } from '@angular/material/dialog';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import ExcelData from 'src/excel-dummy.json';
import { EmployeeTeam } from 'src/app/models/employee-team';
import { AddButtonComponent } from '../add-button/add-button.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { EmployeeProject } from 'src/app/models/employee-project';
import { Project } from 'src/app/models/project';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-equipo-individual',
  templateUrl: './equipo-individual.component.html',
  styleUrls: ['./equipo-individual.component.css']
})
export class EquipoIndividualComponent implements OnInit {

  public employees: Employee[];
  public empTeams: EmployeeTeam[];
  public empProjects: EmployeeProject[];
  public teams: Team[];
  public projects: Project[];
  public unassigned: Employee[];
  team: Team | undefined;
  id: number;
  evaluators: boolean;

  searchText: any;


  constructor(
    private route: ActivatedRoute,
    private dialogRef: MatDialog,
    public navbarActive: NavbarComponent,
    private sql: SqlService
  ) {


    this.teams = [];
    this.employees = [];
    this.empTeams = [];
    this.empProjects = [];
    this.projects = [];
    this.unassigned = [];

    const routeParams = this.route.snapshot.paramMap;
    const empIdFromRoute = Number(routeParams.get('id_employee'));

    this.id = empIdFromRoute;
    this.evaluators = false;

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

  getT(employees: Employee[]) {
    this.sql.getTeams().subscribe((resp) => {
      this.teams = resp;
      this.getEmpT(employees, this.teams);
    })
  }

  getEmpT(employees: Employee[], teams: Team[]) {
    this.sql.getEmployeeTeams().subscribe((resp) => {
      this.empTeams = resp;
      this.getProjects(employees, teams, this.empTeams);
    })
  }

  getProjects(employees: Employee[], teams: Team[], empTeams: EmployeeTeam[]) {
    this.sql.getProjects().subscribe((resp) => {
      this.projects = resp;
      this.getEmployeeProjects(employees, teams, empTeams, this.projects);
    })
  }

  getEmployeeProjects(employees: Employee[], teams: Team[], empTeams: EmployeeTeam[], projects: Project[]) {
    this.sql.getEmployeeProjects().subscribe((resp) => {
      this.empProjects = resp;
      this.createObjects(employees, teams, empTeams, projects, this.empProjects);
    })
  }

  getUnassigned(employees: Employee[], teams: Team[], empTeams: EmployeeTeam[], projects: Project[], empProjects: EmployeeProject) {
    this.sql.getUnassigned().subscribe((resp) => {
      this.unassigned = resp;
    })
  }

  createObjects(employees: Employee[], teams: Team[], empTeams: EmployeeTeam[], projects: Project[], empProjects: EmployeeProject[]) {

    empProjects.forEach(element => {
      var e = employees.find(emp => emp.id === element.id_employee);
      if (e === undefined) {
        e = this.unassigned.find(emp => emp.id === element.id_employee);
      }

      if (e !== undefined) {
        element.employee = e;
      }

    })
    this.empProjects = empProjects;

    empTeams.forEach(element => {
      if (element.role_member === 0) {
        element.role_member_string = "As leader";
      } else if (element.role_member === 1) {
        element.role_member_string = "As peer";
      } else if (element.role_member === 3) {
        element.role_member_string = "Added by request";
      } else {
        element.role_member_string = "As team"
      }
    })
    this.empTeams = empTeams;

    teams.forEach(element => {
      if (element.id_employee === this.id) {
        this.team = element;
      }
    })

  }

  getEmployee() {
    return this.employees.find(element => element.id === this.id);
  }

  getEmpName() {
    return this.employees.find(element => element.id === this.id)!.employee_name;
  }

  getMembers() {
    var members: any = [];
    this.empTeams.forEach(element => {
      if (element.id_team == this.team!.id && element.status_member != 4) {
        var e = this.employees.find(emp => emp.id === element.id_employee);

        if (e === undefined) {
          e = this.unassigned.find(emp => emp.id === element.id_employee);
        }

        if (e !== undefined) {
          element.employee = e;
        }

        if (element.role_member === 0) {
          element.role_member_string = "As leader";
        } else if (element.role_member === 1) {
          element.role_member_string = "As peer";
        }
        else if (element.role_member === 3) {
          element.role_member_string = "Added by request";
        } else {
          element.role_member_string = "As team"
        }

        if (element.status_member == 0 || element.status_member == 2 || element.status_member == 3 || element.status_member == 6) {
          members.push(element);
        }
      }
    });

    return members;
  }

  getEvaluatorRoles() {

    var members: any = [];
    this.empTeams.forEach(element => {
      if (element.id_team == this.team!.id && element.status_member != 4) {
        element.employee = this.employees.find(emp => emp.id === element.id_employee);

        var e = this.employees.find(emp => emp.id === element.id_employee);

        if (e === undefined) {
          e = this.unassigned.find(emp => emp.id === element.id_employee);
        }

        if (e !== undefined) {
          element.employee = e;
        }

        if (element.role_member === 0) {
          element.role_member_string = "As team";
        } else if (element.role_member === 1) {
          element.role_member_string = "As peer";
        } else if (element.role_member === 3) {
          element.role_member_string = "Added by request";
        } else {
          element.role_member_string = "As leader"
        }
        if (element.status_member == 0 || element.status_member == 2 || element.status_member == 3 || element.status_member == 6) {
          members.push(element);
        }

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

  getUnassignedEmployeesInProjects(): any {
    //en esta funcion quiero obtener todos los miembros que no cumplieron las horas
    //en los proyectos del empleado en cuestion.
    var members: any[] = [];

    // lista de id_project en los que trabajó el usuaro en cuestion
    var projectList: any[] = [];

    this.empProjects.forEach(element => {
      if (element.id_employee == this.getEmployee()!.id) {
        projectList.push(element.id_project);
      }
    });

    // did_complete sea falso y id_project esté en projectList
    this.empProjects.forEach(element => {
      if (element.did_complete == false && projectList.indexOf(element.id_project) > -1) {
        if (element.employee !== undefined) {
          members.push(element.employee);
          console.log(element.employee?.employee_name);
        }
      }
    })

    return members;

  }

  openDialog(member: any, employee: any, idEmployeeTeam: any, idReqBy: any, idRemove: any){
    this.dialogRef.open(PopupDeleteComponent,{
      data : {
        m : member,
        e: employee,
        idET: idEmployeeTeam,
        idRB: idReqBy,
        idR: idRemove
      }
    });
  }

  openDialogAdd(members: any) {
    this.dialogRef.open(AddButtonComponent, {
      data: {
        m: members
      }
    });
  }

  navigateBack(page: any) {
    console.log(page);
    this.navbarActive.navigate(page);
  }

  approve() {
    //this.team!.approved_HR = true;
    //console.log(this.team!.approved_HR);
    //console.log(this.team!.id);
    const req = new HttpParams()
      .set('id', this.team!.id)
    this.sql.postApproveHR(req);
  }

  getApprovedHR() {
    return this.team!.approved_HR;
  }
}
