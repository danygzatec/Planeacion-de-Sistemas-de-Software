import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public createTeams = true;

   public consultTeams = false;

   public dashboard  = false;

  constructor(public accountInfo: AppComponent) { }

  ngOnInit(): void {
    
  }

  getName() : any {
    let fullName = this.accountInfo.getNameAccount();
    let name : string;
    
    if (fullName !== null) {
      var firstSpace = fullName.indexOf(" ");
      name = fullName.substring(0, firstSpace);
      //console.log(name);
      return name;
    }
  }

  getEmail() : any {
    return this.accountInfo.getEmailAccount();
  }

  logout() {
    this.accountInfo.logout();
  }

  navigate(page: any){

    console.log(page);

    if(page === '/crear-equipos'){

      this.createTeams = true;

      this.consultTeams = false;

      this.dashboard  = false;

   }else if(page === '/consultar-equipos'){

     this.createTeams = false;

     this.consultTeams = true;

     this.dashboard  = false;

   }else if(page === '/dashboard'){

     this.createTeams = false;

     this.consultTeams = false;

     this.dashboard  = true;

   }
  }


}
