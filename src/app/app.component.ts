import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import ExcelData from 'src/excel-dummy.json'
import { Title } from '@angular/platform-browser';


import {Router} from '@angular/router';
import { Employee } from './models/employee';
import { EvaluationPeriod } from './models/evaluation-period';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SqlService } from './services/sql.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  template:'<h1>IPSCentral</h1>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IPSCentral';
  employees : Employee[];
  evaluationPeriod : EvaluationPeriod[];
  private has_u = false;

  constructor(
    private msalService: MsalService, 
    public router: Router,
    public sql : SqlService
    ){
      
    this.employees = [];
    this.evaluationPeriod = [];

  }
  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if (res != null && res.account !=null){
          this.msalService.instance.setActiveAccount(res.account)
        }
      }
    )
    this.getHasUpload();
    this.employees = ExcelData.employee;
    this.evaluationPeriod = ExcelData.evaluation_period;
    //this.isLoggedIn();

  }

  isLoggedIn() : boolean {
    
    //console.log("router.nagivate");
    return this.msalService.instance.getActiveAccount() != null
  }

  login(){
    //redirect a microsoft login
    //this.msalService.loginRedirect();
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) =>{
      this.msalService.instance.setActiveAccount(response.account)
      // console.log("hola", response.account?.name)
      // console.log("hola", response.account?.username)
      this.rerouteHR();
    });
    
    //this.router.navigate(['/crear-equipos']);
  }

  logout(){
    this.msalService.logout();
  }

  getNameAccount(): any{
    return this.msalService.instance.getActiveAccount()?.name;
  }

  getEmailAccount(): any{
    return this.msalService.instance.getActiveAccount()?.username;
  }

  getHasUpload() : any {
    //console.log("navbar app", this.evaluationPeriod[0].has_uploaded);
    this.sql.getHasUploaded().subscribe((resp) => {
      console.log(resp);
      return resp;
    });
  }
  
  isHR() : boolean {
    if (this.isLoggedIn()){
      var user = this.employees.find(element => element.employee_name === this.msalService.instance.getActiveAccount()!.name);
    if (user!.is_HR) {
      return true;
    } else {
      return false;
    }
    }
    else{
      return false;
    }
  }

  rerouteHR() {
    if (this.isLoggedIn()){
      var user = this.employees.find(element => element.employee_name === this.msalService.instance.getActiveAccount()!.name);
      if (user!.is_HR) {
        if (this.getHasUpload()) {
          this.router.navigate(['consultar-equipos']);
        } else {
          this.router.navigate(['crear-equipos']);
        }
      } else {
        this.router.navigate(['myprojects']);
      }
  }
  }

}
