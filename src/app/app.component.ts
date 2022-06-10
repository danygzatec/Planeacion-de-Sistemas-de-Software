import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

import { Router } from '@angular/router';
import { Employee } from './models/employee';
import { EvaluationPeriod } from './models/evaluation-period';
import { Request } from './models/request';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SqlService } from './services/sql.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<h1>IPSCentral</h1>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IPSCentral';
  employees: Employee[];
  evaluationPeriod: EvaluationPeriod[];
  requests : Request[];
  private has_u = false;
  public nRequests: number = 0;

  constructor(
    public msalService: MsalService,
    public router: Router,
    public sql: SqlService
  ) {

    this.employees = [];
    this.evaluationPeriod = [];
    this.requests = [];

  }
  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if (res != null && res.account != null) {
          this.msalService.instance.setActiveAccount(res.account)
        }
      }
    )
    this.getHasUpload();
    this.getUsers();
    this.getEvaluationPeriod();
    this.getRequests();
    //this.isLoggedIn();

  }

  isLoggedIn(): boolean {

    //console.log("router.nagivate");
    return this.msalService.instance.getActiveAccount() != null
  }

  login() {
    //redirect a microsoft login
    //this.msalService.loginRedirect();
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account)
      // console.log("hola", response.account?.name)
      // console.log("hola", response.account?.username)
      this.rerouteHR();
    });

    //this.router.navigate(['/crear-equipos']);
  }

  logout() {
    this.msalService.logout();
  }

  getNameAccount(): any {
    //return this.msalService.instance.getActiveAccount()?.name;
   var user = this.employees.find(element => element.email === this.msalService.instance.getActiveAccount()!.username);
   return user?.employee_name;
  }

  getEmailAccount(): any {
    return this.msalService.instance.getActiveAccount()!.username;
  }

  getUsers(): any {
    //this.sql.getEmployees().subscribe((resp) => {
    this.sql.getAllEmployees().subscribe((resp) => {
      this.employees = resp;
      return resp;
    })
  }

  getEvaluationPeriod(): any {
    this.sql.getEvaluationPeriods().subscribe((resp) => {
      this.evaluationPeriod = resp;
      return resp;
    })
  }

  getHasUpload() : any {
    //console.log("navbar app", this.evaluationPeriod[0].has_uploaded);
    this.sql.getHasUploaded().subscribe((resp) => {
      this.has_u = resp;
      return resp;
      //this.rerouteHR(employees, resp);
    });
  }

  getCountRequests(employees : Employee[], hasUploaded : boolean){
    this.sql.getRequests().subscribe((resp) => {
      this.requests = resp;
      this.nRequests = this.requests.length;
      //this.rerouteHR(employees, hasUploaded);
    })
  }

  getRequests() : number {
    this.sql.getRequests().subscribe((resp) => {
      this.requests = resp;
      
    })

    return this.requests.length;
  }

  isHR(): boolean {
    if (this.isLoggedIn()) {
      var user = this.employees.find(element => element.email === this.msalService.instance.getActiveAccount()!.username);
      console.log(this.employees);
      console.log(user);
      if (user!.is_HR) {
        return true;
      } else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  rerouteHR() {
    if (this.isLoggedIn()) {
      var user = this.employees.find(element => element.email === this.msalService.instance.getActiveAccount()!.username);
      console.log(this.msalService.instance.getActiveAccount()!.username);
      console.log(user);
      if (user === undefined) {
        this.logout();
      } else {
        if (user.is_HR) {
          if (this.getHasUpload()) {
            this.router.navigate(['consultar-equipos']);
            //window.location.reload();
          } else {
            this.router.navigate(['crear-equipos']);
          }
        } else {
          this.router.navigate(['myprojects']);
        }
      }
    }
  }

}
