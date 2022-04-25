import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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

  logout() {
    this.accountInfo.logout();
  }


}
