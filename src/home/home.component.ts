import { Component,  } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title= 'IPSCentral';

  constructor(private msalService: MsalService) {


   }

  isLoggedIn() : boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  logout(){
    this.msalService.logout();
  }

}
