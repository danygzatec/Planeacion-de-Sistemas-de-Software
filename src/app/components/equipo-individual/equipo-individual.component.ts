import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/models/team';
import { ConsultarEquiposComponent } from 'src/app/components/consultar-equipos/consultar-equipos.component'
import { Employee } from 'src/app/models/employee';

import { MatDialog } from  '@angular/material/dialog';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import ExcelData from 'src/excel-dummy.json';
import { EmployeeTeam } from 'src/app/models/employee-team';

@Component({
  selector: 'app-equipo-individual',
  templateUrl: './equipo-individual.component.html',
  styleUrls: ['./equipo-individual.component.css']
})
export class EquipoIndividualComponent implements OnInit {

  employees : Employee[];
  empTeams : EmployeeTeam[];
  teams : Team[];
  team: Team | undefined ;
  id : number;


  constructor(
    private route: ActivatedRoute,
    private  dialogRef : MatDialog
    ){
    
    const routeParams = this.route.snapshot.paramMap;
    const empIdFromRoute = Number(routeParams.get('id_employee'));

    this.teams = ExcelData.team;
    this.employees = ExcelData.employee;
    this.empTeams = ExcelData.employee_team
    this.team = this.teams.find(element => element.id_employee === empIdFromRoute);
    this.id = empIdFromRoute;

   }

  async ngOnInit(): Promise<void> {
    await this.initializeObjects();

  }

  async initializeObjects() {
    this.teams = ExcelData.team;
    this.employees = ExcelData.employee;
    this.empTeams = ExcelData.employee_team;

  }

  async createObjects() {
    await this.initializeObjects();

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

  openDialog(){
    this.dialogRef.open(PopupDeleteComponent);
  }

}
