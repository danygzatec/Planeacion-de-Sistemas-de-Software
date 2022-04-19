import { Component,  } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  title= 'IPSCentral';

  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
      
  }

  isLoggedIn() : boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  logout(){
    this.msalService.logout();
  }

}
