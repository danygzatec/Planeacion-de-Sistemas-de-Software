import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Employee } from 'src/app/models/employee';
import { EmployeeTeam } from 'src/app/models/employee-team';
import { Team } from 'src/app/models/team';
import ExcelData from 'src/excel-dummy.json'

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})

export class MyteamComponent implements OnInit {

  private employees : Employee[];
  private empTeams : EmployeeTeam[];
  private teams : Team[];
  private team : any;
  evaluators : boolean;

  constructor(private accountInfo : AppComponent) { 
    this.employees = ExcelData.employee;
    this.empTeams = ExcelData.employee_team;
    this.teams = ExcelData.team;
    this.createObjects();
    this.evaluators = false;
  }

  ngOnInit(): void {
    this.employees = ExcelData.employee;
    this.empTeams = ExcelData.employee_team;
    this.teams = ExcelData.team;
    this.evaluators = false;
    this.createObjects();
  }

  createObjects() {
    this.teams.forEach(team => {
      var e = this.employees.find(emp => emp.id_employee === team.id_employee);
      team.employee = e;
    })
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

}
