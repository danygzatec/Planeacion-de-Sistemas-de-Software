import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UploadButtonComponent } from 'src/app/components/HR/upload-button/upload-button.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public createTeams = false;

   public consultTeams = true;

   public dashboard  = false;

   public firstFile = false;

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

    //console.log("NavBarComponent", page);
    if (this.accountInfo.evaluationPeriod[0].has_uploaded){
      if(page === '/crear-equipos'){

        console.log("función navigate /crear-equipos");
  
        //this.createTeams = true;
  
        //this.consultTeams = false;
  
        //this.dashboard  = false;
  
     }else if(page === '/consultar-equipos'){
  
      console.log("función navigate /consultar-equipos");
  
       this.createTeams = false;
  
       this.consultTeams = true;
  
       this.dashboard  = false;
  
     }else if(page === '/dashboard'){
  
      console.log("función navigate /dashboard");
  
       this.createTeams = false;
  
       this.consultTeams = false;
  
       this.dashboard  = true;
  
     }
    }

    
  }

  cleanNavbar(){

    console.log("cleanNavbar()");
    this.createTeams = false;

     this.consultTeams = false;

     this.dashboard  = false;
  }

  navbarFileUpload(){
    this.createTeams = false;

     this.consultTeams = true;

     this.dashboard  = false;

     this.navigate('/consultar-equipos');
  }

  getHasUploadApp(): boolean{
    //console.log("getHasUpload()", this.accountInfo.evaluationPeriod[0].has_uploaded, " consultTeams", this.consultTeams);
    //return this.accountInfo.getHasUpload();
    return this.accountInfo.evaluationPeriod[0].has_uploaded;
  }

  setFirstFile(){
    this.firstFile = true;
  }

  getConsultTeams(){
    return this.consultTeams;
  }


}
