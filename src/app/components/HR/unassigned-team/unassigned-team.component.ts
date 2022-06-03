import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeProject } from 'src/app/models/employee-project';
import { EmployeeTeam } from 'src/app/models/employee-team';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import { SqlService } from 'src/app/services/sql.service';
import ExcelData from 'src/excel-dummy.json'
import { createAbstractBuilder } from 'typescript';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';

@Component({
  selector: 'app-unassigned-team',
  templateUrl: './unassigned-team.component.html',
  styleUrls: ['./unassigned-team.component.css']
})
export class UnassignedTeamComponent implements OnInit {

  public employees: Employee[];
  public empTeams: EmployeeTeam[];
  public teams: Team[];
  unassinged: Employee[];
  id: number;
  navbarActive: any;
  currEmployee: any;
  teamOfUnassigned: any;
  team: any;
  members : EmployeeTeam[];


  constructor(
    private route: ActivatedRoute,
    private sql: SqlService,
    private  dialogRef : MatDialog,) {

    this.employees = [];
    this.empTeams = [];
    this.unassinged = [];
    this.teams = [];
    this.members = [];


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

  getUnassigned(employees: Employee[]) {
    this.sql.getUnassigned().subscribe((resp) => {
      this.unassinged = resp;
      this.currEmployee = this.unassinged.find(u => u.id === this.id);

      this.getUnassignedTeams(employees, this.currEmployee);
    })
  }

  getUnassignedTeams(employees: Employee[], currEmployee : Employee) {
    this.sql.getUnassignedTeams().subscribe((resp) => {
      this.empTeams = resp;

      this.getTeams(employees, this.empTeams, currEmployee);

    })
  }

  getTeams(employees: Employee[], empTeams: EmployeeTeam[], currEmployee : Employee) {
    this.sql.getTeams().subscribe((resp) => {
      this.teams = resp;

      console.log("Equipos ", this.teams);

      this.teams.forEach( t => {
        if (t.id_employee === currEmployee.id) {
          this.team = t;
        }
      })
      console.log(this.team);

      this.createObjects(employees, empTeams, this.team);

    })
  }

  /*
   this.empTeams.forEach(element => {
      if (element.id_team == this.team!.id && element.status_member != 4) {
        element.employee = this.employees.find(emp => emp.id === element.id_employee);
        
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
  
  */

  createObjects(employees: Employee[], empTeams: EmployeeTeam[], team: Team) {

    empTeams.forEach(et => {
      console.log(et)
      if (et.id_team === team.id && et.status_member != 4) {
        console.log("dentro del if");
        et.employee = employees.find(emp => emp.id === et.id_employee);
        if (et.employee === undefined) {
          et.employee = this.unassinged.find(u => u.id === et.id_employee);
        }

        if (et.role_member === 0) {
          et.role_member_string = "leader";
        } else if (et.role_member === 1) {
          et.role_member_string = "peer";
        } else {
          et.role_member_string = "team"
        }
        
        console.log("agregando a members ", et);
        this.members.push(et);
      }
    });

    this.members.forEach(memb => {
      console.log(memb.employee?.employee_name);
    });

  }

  addTeam() {

    // post al api que haga un insert en Teams
    console.log("Aqui se va a crear el equipo :p");
  }

  navigateBack(page: any) {
    console.log(page);
    this.navbarActive.navigate(page);
  }

  openDialog(member: any, employee: any, idEmployeeTeam: any){
    this.dialogRef.open(PopupDeleteComponent,{
      data : {
        m : member,
        e: employee,
        idET: idEmployeeTeam
      }
    });
  }

}
