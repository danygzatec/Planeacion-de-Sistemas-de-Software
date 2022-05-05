import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  constructor(public accountInfo: AppComponent) { }

  ngOnInit(): void {
  }
  url="https://img.icons8.com/pastel-glyph/2x/person-male--v3.png"
  onSelect(event : any){
    if(event.target.files[0]){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) =>{
        this.url = event.target.result;
      }
    }
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

}
