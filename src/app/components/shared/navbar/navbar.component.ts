import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UploadButtonComponent } from 'src/app/components/HR/upload-button/upload-button.component';
import { SqlService } from 'src/app/services/sql.service';
import { InboxComponent } from '../../HR/inbox/inbox.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  public createTeams = false;

   public consultTeams = true;

   public dashboard  = false;

   public hasUploaded : any = false;


  constructor(
    public accountInfo: AppComponent, 
    private requestInfo: InboxComponent,
    private sql : SqlService
    ) { }

  ngOnInit(): void {

    this.sql.getHasUploaded().subscribe((res) => {
      this.hasUploaded = res;
    });
    console.log(this.hasUploaded);

    setTimeout(() => { this.getCountRequests() }, 1000 * 1);
    
  }
  

  getName() : any {
    let fullName = this.accountInfo.getNameAccount();
    let name : string;
    
    if (fullName !== null) {
      
      var comma = fullName.indexOf(",");
      if (comma != -1){
        name = fullName.substring(comma+2, fullName.length);
      }else {
        var firstSpace = fullName.indexOf(" ");
        name = fullName.substring(0, firstSpace);
      }
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
    this.hasUploaded = this.sql.getHasUploaded();

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
    
    // this.hasUploaded = this.sql.getHasUploaded()

    if (this.hasUploaded === undefined || this.hasUploaded === null ) {
      return false;
    }

    return this.hasUploaded;
  }

  getConsultTeams(){
    return this.consultTeams;
  }

  getCountRequests(): number {
    //this.requestInfo.ngOnInit();
    //return this.accountInfo.getRequests();
    return this.accountInfo.nRequests;
  }


}
