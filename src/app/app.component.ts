import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import ExcelData from 'src/excel-dummy.json'
import { Title } from '@angular/platform-browser';


import {Router} from '@angular/router';
import { Employee } from './models/employee';
import { EvaluationPeriod } from './models/evaluation-period';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

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

  constructor(private msalService: MsalService, public router: Router){
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

  setHasUpload(){
    this.evaluationPeriod[0].has_uploaded = true;
    //console.log("excel app", this.evaluationPeriod[0].has_uploaded);
  }

  getHasUpload() : boolean{
    //console.log("navbar app", this.evaluationPeriod[0].has_uploaded);
    return this.evaluationPeriod[0].has_uploaded!
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
        this.router.navigate(['crear-equipos']);
      } else {
        this.router.navigate(['myprojects']);
      }
  }
  }

}
