import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navbar-employee',
  templateUrl: './navbar-employee.component.html',
  styleUrls: ['./navbar-employee.component.css']
})
export class NavbarEmployeeComponent implements OnInit {

  public myProjects = true;

   public myTeam = false;

  constructor(private accountInfo: AppComponent) { }

  ngOnInit(): void {
    
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

    //console.log("NavBarEmpComponent", page);

    if(page === '/myprojects'){

      this.myProjects = true;

      this.myTeam = false;

   }else if(page === '/myteam'){
    //console.log("if");

    this.myProjects = false;

    this.myTeam = true;

   }

   else{
    console.log("else");

    this.myProjects = false;

    this.myTeam = false;

   }
  }

  cleanNavbar(){
    console.log("navbarcomp")
    this.myProjects = false;

    this.myTeam = false;

    console.log(this.myTeam)
  }

}
