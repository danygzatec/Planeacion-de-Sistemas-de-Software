import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UploadButtonComponent } from '../../upload-button/upload-button.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public createTeams = false;

   public consultTeams = false;

   public dashboard  = false;

   //public hasUpload = false;

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

    console.log("NavBarComponent", page);

    if(page === '/crear-equipos'){

      this.createTeams = true;

      this.consultTeams = false;

      this.dashboard  = false;

   }else if(page === '/consultar-equipos'){
    console.log("if");

     this.createTeams = false;

     this.consultTeams = true;

     this.dashboard  = false;

   }else if(page === '/dashboard'){

     this.createTeams = false;

     this.consultTeams = false;

     this.dashboard  = true;

   }
  }

  cleanNavbar(){
    this.createTeams = false;

     this.consultTeams = false;

     this.dashboard  = false;
  }

  // setHasUpload(){
  //   this.hasUpload = true;
  //   console.log("excel", this.hasUpload);
  // }

  getHasUploadApp(): boolean{
    console.log("navbar", this.accountInfo.hasUpload);
    return this.accountInfo.getHasUpload();
  }


}
