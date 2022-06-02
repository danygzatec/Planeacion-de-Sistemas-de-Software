import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { Employee } from 'src/app/models/employee';
import { EmployeeProject } from 'src/app/models/employee-project';
import { EmployeeTeam } from 'src/app/models/employee-team';
import { Team } from 'src/app/models/team';
import { SqlService } from 'src/app/services/sql.service';
import { NavbarEmployeeComponent } from '../../shared/navbar-employee/navbar-employee.component';
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
  members : EmployeeTeam[];
  membersEvaluators : EmployeeTeam[];
  evaluators : boolean;

  searchText: any;

  constructor(
    private accountInfo : AppComponent, 
    private  dialogRef : MatDialog, 
    private navbarInfo: NavbarEmployeeComponent,
    private sql : SqlService
    ) { 
    this.employees = [];
    this.empTeams = [];
    this.empProjects = [];
    this.teams = [];
    this.members = [];
    this.membersEvaluators = [];

    this.createObjects();
    this.evaluators = false;
  }

  ngOnInit(): void {
    this.getEmps();
    //this.getEmpTeams();
    //this.getTeam();
    //this.getEmpPro();

    this.evaluators = false;

    this.createObjects();
  }

  //searchText:string = '';
  
  // onSearchTextEntered(searchValue: string){
  //   this.searchText = searchValue;
  //   console.log(this.searchText);

  // }

  getEmps() {
    this.sql.getEmployees().subscribe((resp) => {
      this.employees = resp;
      this.getTeam(this.employees);
    });
  }

  getEmpTeams(t : Team) {
    this.sql.getEmployeeTeams().subscribe((resp) => {
      this.empTeams = resp;
      
      this.getMembers(t, this.empTeams);
      console.log("despues de get members");
      this.getEvaluatorRoles(t, resp);
      console.log("despues de evaluator roles");
    })
  }

  getTeam(employees : Employee[]) {
    var t;

    // this.getEmps();

    this.sql.getTeams().subscribe((resp) => {
      this.teams = resp;

      var e = employees.find(emp => emp.email === this.accountInfo.getEmailAccount());
      t = this.teams.find(te => te.id_employee === e!.id);
      if (t !== undefined) {
        this.team = t;
        this.getEmpTeams(this.team);
        //this.getMembers(t);
      }
    })

  }

  // getEmpPro() {
  //   this.sql.getEmployeeProjects().subscribe((resp) => {
  //     this.empProjects = resp;
  //   })
  // }


  createObjects() {

    this.empProjects.forEach(element => {
      element.employee = this.employees.find(emp => emp.id === element.id_employee);
    });

    this.teams.forEach(team => {
      var e = this.employees.find(emp => emp.id === team.id_employee);
      team.employee = e;
    });
  }

  getMembers(team : Team, empTeams : EmployeeTeam[]) {
    var members : any = [];

    //this.getTeam();

    empTeams.forEach(empT => {
      var element = empT;
      if (element.id_team === team.id) {
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
    
    this.members = members;
    console.log(this.members);
  }

  getEvaluatorRoles(team : Team, empTeams : EmployeeTeam[]) {

    var members : any = [];

    empTeams.forEach(empT => {
      var element = empT;
      if (element.id_team === team.id) {

        element.employee = this.employees.find(emp => emp.id === element.id_employee);

        if (element.role_member === 0) {
          element.role_member_string = "team";
        } else if (element.role_member === 1) {
          element.role_member_string = "peer";
        } else {
          element.role_member_string = "leader";
        }
        
        members.push(element);
      }
    });

    this.membersEvaluators = members;
    console.log(this.membersEvaluators);
  }

  setEvaluatorBool() {
    this.evaluators = !this.evaluators
  }

  getEvaluatorBool() {
    return this.evaluators;
  }

  getEmp() {
    return this.employees.find(element => element.email === this.accountInfo.getEmailAccount());
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
      if (element.id_employee == this.getEmp()!.id) {
        projectList.push(element.id_project);
      }
    });

    // did_complete sea falso y id_project esté en projectList
    this.empProjects.forEach(element => {
      //console.log("fuera del if");
      if (element.did_complete == false && projectList.indexOf(element.id_project) > -1) {
        //console.log("dentro del if");
        members.push(element.employee);
        //console.log(element.employee?.employee_name);
      }
    })

    //console.log(members);

    return members;

  }

  openDialog(member: any, employee: any){
    this.dialogRef.open(PopupDeleteEmpComponent,{
      data : {
        m : member,
        e: employee
      }
    });
    //console.log("Hola estoy en open Dialog!");
  }

  openDialogAdd(members: any){
    this.dialogRef.open(AddButtonEmpComponent, {
      data : {
        m : members
      }
    });
  }

  approve(){
    //console.log("cleanNavbar()")
    this.navbarInfo.cleanNavbar();
    this.navbarInfo.navigate('');
    
    this.team.approved_Emp = true;
  }

  getApprovedEmp(){
    //console.log(this.team.approved_Emp);
    if (this.team === undefined) {
      return false;
    }
    return this.team.approved_Emp;
  }

}
