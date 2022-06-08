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
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})



export class MyteamComponent implements OnInit {

  private employees: Employee[];
  private empTeams: EmployeeTeam[];
  private empProjects: EmployeeProject[];
  private teams: Team[];
  private team: any;
  members: EmployeeTeam[];
  membersEvaluators: EmployeeTeam[];
  evaluators: boolean;
  unassigned: Employee[];

  //employee: any;

  searchText: any;
  myTeam: any;

  constructor(
    private accountInfo: AppComponent,
    private dialogRef: MatDialog,
    private navbarInfo: NavbarEmployeeComponent,
    private sql: SqlService
  ) {
    this.employees = [];
    this.empTeams = [];
    this.empProjects = [];
    this.teams = [];
    this.members = [];
    this.membersEvaluators = [];
    this.unassigned = [];

    this.evaluators = false;
  }

  ngOnInit(): void {
    this.getEmps();

    this.evaluators = false;

    this.createObjects();

    this.getUnassigned();

    this.getEmpProjects();

  }


  getEmps() {
    this.sql.getEmployees().subscribe((resp) => {
      this.employees = resp;
      this.getTeam(this.employees);
    });
  }

  getEmpTeams(t: Team) {
    this.sql.getEmployeeTeams().subscribe((resp) => {
      this.empTeams = resp;

      this.getMembers(t, this.empTeams);
    })
  }

  getTeam(employees: Employee[]) {
    var t;

    this.sql.getTeams().subscribe((resp) => {
      this.teams = resp;

      var e = employees.find(emp => emp.email === this.accountInfo.getEmailAccount());
      t = this.teams.find(te => te.id_employee === e!.id);
      if (t !== undefined) {
        this.team = t;
        this.myTeam = this.team;
        this.getEmpTeams(this.team);
      }
    })

  }

  getUnassigned() {
    this.sql.getUnassigned().subscribe((resp) => {
      this.unassigned = resp;
    })
  }

  createObjects() {

    this.empProjects.forEach(element => {
      element.employee = this.employees.find(emp => emp.id === element.id_employee);
    });

    this.teams.forEach(team => {
      var e = this.employees.find(emp => emp.id === team.id_employee);
      team.employee = e;
    });

    //this.getEmp();
  }

  getMembers(team: Team, empTeams: EmployeeTeam[]) {
    var members: any = [];

    empTeams.forEach(empT => {
      var element = empT;
      if (element.id_team === team.id) {
        element.employee = this.employees.find(emp => emp.id === element.id_employee);

        if (element.role_member === 0) {
          element.role_member_string = "As leader";
        } else if (element.role_member === 1) {
          element.role_member_string = "As peer";
        } else if (element.role_member === 3 && element.status_member != 5) {
          element.role_member_string = "";
        }else if (element.role_member == 2){
          element.role_member_string = "As team"
        }

        if (element.status_member == 0) {
          element.status_member_string = "";
        } else if (element.status_member == 1) {
          element.status_member_string = "Waiting approval to add...";
        } else if (element.status_member == 2) {
          element.status_member_string = "Waiting approval to remove...";
        } else if (element.status_member == 3) {
          element.status_member_string = "Added by HR";
        } else if (element.status_member == 4) {
          element.status_member_string = "Removed by HR";
        } else if (element.status_member == 5) {
          element.status_member_string = "Addition declined by HR";
        } else if (element.status_member == 6) {
          element.status_member_string = "Removal declined by HR";
        }

        if(this.getApprovedEmp() && (element.status_member == 0 || element.status_member == 3 || element.status_member == 6)){
          members.push(element);
        }
        else if(!this.getApprovedEmp()){
          members.push(element);
        }
       
      }
    });

    this.members = members;
  }

  getEmpProjects() {
    this.sql.getEmployeeProjects().subscribe((resp) => {
      this.empProjects = resp;
    })
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

  getUnassignedEmployeesInProjects(): any {
    //en esta funcion quiero obtener todos los miembros que no cumplieron las horas
    //en los proyectos del empleado en cuestion.

    var members: any[] = [];

    // lista de id_project en los que trabajó el usuaro en cuestion
    var projectList: any[] = [];

    // buscamos los proyectos en los que trabajo el usuario y los agregamos a la lista
    this.empProjects.forEach(element => {
      if (element.id_employee == this.getEmp()!.id) {
        projectList.push(element.id_project);
      }
    });

    // did_complete sea falso y id_project esté en projectList
    this.empProjects.forEach(element => {
      //console.log("did complete: ", element.did_complete);

      // si el emp no completó horas y trabajó en al menos 1 mismo proyecto que current user
      if (element.did_complete === false && projectList.indexOf(element.id_project) > -1) {
        // console.log("dentro del if");

        // buscamos el objeto employee para agregarseo a members
        var e = this.employees.find(emp => emp.id === element.id_employee);
        var findMember = this.members.find(emp => emp.id_employee === e?.id);
        // si en la busqueda de empleados normales sale undefined, buscamos en los huerfanos
        if (e === undefined) {
          e = this.unassigned.find(emp => emp.id === element.id);
        }

        // el e no esta definido y si no es el empleado logged in

        if (e !== undefined && e.id !== this.team.id_employee && findMember == undefined) {
          if (members.indexOf(e) == -1){
            members.push(e);
            console.log(e);
          }
        }
      }
    })

    console.log("members para agregar: ", members);

    return members;

  }

  openDialog(member: any, employee: any, id_employee_teams: any, employee_req: any) {
    this.dialogRef.open(PopupDeleteEmpComponent, {
      data: {
        m: member,
        e: employee,
        idET: id_employee_teams,
        eR: employee_req
      }
    });
  }

  openDialogAdd(members: any, employee: any, team: any) {
    this.dialogRef.open(AddButtonEmpComponent, {
      data: {
        m: members,
        e: employee,
        t: team
      }
    });
  }

  approve() {
    this.navbarInfo.cleanNavbar();
    this.navbarInfo.navigate('');
    const req = new HttpParams()
        .set('id',this.myTeam.id)

      //console.log(req);
      this.sql.postApproveEmp(req);
      window.location.reload();

    //this.team.approved_Emp = true;
  }

  getApprovedEmp() {

    if (this.team === undefined) {
      return false;
    }
    return this.team.approved_Emp;
  }

  getMemberStatus(member: any) {

    if (member.status_member == 5 || member.status_member == 4) {
      return false;
    }
    return true;
  }

}
