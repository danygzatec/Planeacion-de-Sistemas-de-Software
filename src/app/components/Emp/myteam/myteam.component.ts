import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { Employee } from 'src/app/models/employee';
import { EmployeeProject } from 'src/app/models/employee-project';
import { EmployeeTeam } from 'src/app/models/employee-team';
import { Team } from 'src/app/models/team';
import ExcelData from 'src/excel-dummy.json'
import { AddButtonEmpComponent } from '../add-button-emp/add-button-emp.component';
import { PopupDeleteEmpComponent } from '../popup-delete-emp/popup-delete-emp.component';

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})

export class MyteamComponent implements OnInit {

  private employees : Employee[];
  private empTeams : EmployeeTeam[];
  private empProjects : EmployeeProject[];
  private teams : Team[];
  private team : any;
  evaluators : boolean;

  constructor(private accountInfo : AppComponent, private  dialogRef : MatDialog) { 
    this.employees = ExcelData.employee;
    this.empTeams = ExcelData.employee_team;
    this.empProjects = ExcelData.employee_project;

    this.teams = ExcelData.team;
    this.createObjects();
    this.evaluators = false;
  }

  ngOnInit(): void {
    this.employees = ExcelData.employee;
    this.empTeams = ExcelData.employee_team;
    this.teams = ExcelData.team;
    this.evaluators = false;
    this.empProjects = ExcelData.employee_project;
    this.createObjects();
  }

  createObjects() {

    this.empProjects.forEach(element => {
      element.employee = this.employees.find(emp => emp.id_employee === element.id_employee);
    });

    this.teams.forEach(team => {
      var e = this.employees.find(emp => emp.id_employee === team.id_employee);
      team.employee = e;
    });
  }

  getMembers() {
    var members : any = [];

    this.team = this.teams.find(element => element.employee!.employee_name === this.accountInfo.getNameAccount());

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

  getEmp() {
    return this.employees.find(element => element.employee_name === this.accountInfo.getNameAccount());
  }

  getEmpName() {
    return this.accountInfo.getNameAccount();
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
      console.log("fuera del if");
      if (element.did_complete == false && projectList.indexOf(element.id_project) > -1) {
        console.log("dentro del if");
        members.push(element.employee);
        console.log(element.employee?.employee_name);
      }
    })

    console.log(members);

    return members;

  }

  openDialog(member: any, employee: any){
    this.dialogRef.open(PopupDeleteEmpComponent,{
      data : {
        m : member,
        e: employee
      }
    });
    console.log("Hola estoy en open Dialog!");
  }

  openDialogAdd(members: any){
    this.dialogRef.open(AddButtonEmpComponent, {
      data : {
        m : members
      }
    });
  }

}
