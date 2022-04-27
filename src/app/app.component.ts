import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';


import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IPSCentral';

  constructor(private msalService: MsalService){


  }
  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if (res != null && res.account !=null){
          this.msalService.instance.setActiveAccount(res.account)
        }
      }
    )
  }

  isLoggedIn() : boolean {
    // this.router.navigate(['home']);
    return this.msalService.instance.getActiveAccount() != null
  }

  login(){
    //redirect a microsoft login
    //this.msalService.loginRedirect();
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) =>{
      this.msalService.instance.setActiveAccount(response.account)
      // console.log("hola", response.account?.name)
      // console.log("hola", response.account?.username)
    }); 
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

}
