import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http'
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.css']
})
export class PopupDeleteComponent implements OnInit {

  public member;
  public employee;
  public idEmpTeam;

  constructor(private sql: SqlService, private dialogRef:  MatDialogRef<PopupDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.member = data.m;
    this.employee = data.e;
    this.idEmpTeam = data.idET;
  }

   
  ngOnInit(): void {
  }

  closeMe() {
    this.dialogRef.close();
  }

  removeHR() {
    console.log(this.idEmpTeam.id);
      const req = new HttpParams()
        .set('id', this.idEmpTeam.id)
      //console.log(req);
      this.sql.postRemoveHR(req);
      this.dialogRef.close();
    
  }

}
