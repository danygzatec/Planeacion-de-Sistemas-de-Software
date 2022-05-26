import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UploadButtonComponent } from 'src/app/components/HR/upload-button/upload-button.component';
import { SqlService } from 'src/app/services/sql.service';
import { InboxComponent } from '../../HR/inbox/inbox.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public createTeams = false;

   public consultTeams = true;

   public dashboard  = false;

   public hasUploaded : any;


  constructor(
    public accountInfo: AppComponent, 
    private requestInfo: InboxComponent,
    private sql : SqlService
    ) { }

  ngOnInit(): void {
    
    this.sql.getHasUploaded().pipe(map((resp) => {
      this.hasUploaded = resp;
    }));

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
    this.sql.getHasUploaded().subscribe((resp) => {
      this.hasUploaded = resp;
    });
    
    if (this.hasUploaded){
      if(page === '/crear-equipos'){

        //console.log("función navigate /crear-equipos");
  
        //this.createTeams = true;
  
        //this.consultTeams = false;
  
        //this.dashboard  = false;
  
     }else if(page === '/consultar-equipos'){
  
      //console.log("función navigate /consultar-equipos");
  
       this.createTeams = false;
  
       this.consultTeams = true;
  
       this.dashboard  = false;
  
     }else if(page === '/dashboard'){
  
      //console.log("función navigate /dashboard");
  
       this.createTeams = false;
  
       this.consultTeams = false;
  
       this.dashboard  = true;
  
     }
    }

    
  }

  cleanNavbar(){

    //console.log("cleanNavbar()");
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

  getHasUploadApp() : any {
    //console.log("getHasUpload()", this.accountInfo.evaluationPeriod[0].has_uploaded, " consultTeams", this.consultTeams);
    //return this.accountInfo.getHasUpload();
    
    this.sql.getHasUploaded().pipe(map((resp) => {
      this.hasUploaded = resp;
      console.log("has uploaded navbar", this.hasUploaded);
      return resp;
      }));
  }

  getConsultTeams(){
    return this.consultTeams;
  }

  getCountRequests(): number {
    return this.requestInfo.countRequests();
  }


}
