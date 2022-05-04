import { Component,  } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, RedirectClient } from '@azure/msal-browser';
import { OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import ExcelData from 'src/excel-dummy.json'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  employees : Employee[];
  title= 'IPSCentral';

  constructor(private msalService: MsalService, private router: Router) {
    this.employees = ExcelData.employee;
   }

  async ngOnInit(): Promise<void> {
      this.employees = ExcelData.employee;
      await this.rerouteHR();
  }

  isLoggedIn() : boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  logout(){
    this.msalService.logout();
  }

  rerouteHR() {
    var userInfo = this.msalService.instance.getActiveAccount();
    var user = this.employees.find(element => element.employee_name === userInfo!.name);
    if (user!.is_HR) {
      this.router.navigate(['/crear-equipos']);
      console.log("user is HR");
    } else {
      console.log("User is not HR")
      // this.router.navigate(['myprojects/' + user!.id_employee]);
      this.router.navigate(['myprojects/']);
    }
  }

}
