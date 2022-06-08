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
  public idReqBy;
  public idRemove;
  //public isUnassigned;

  constructor(private sql: SqlService, private dialogRef:  MatDialogRef<PopupDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.member = data.m;
    this.employee = data.e;
    this.idEmpTeam = data.idET;
    this.idReqBy = data.idRB;
    this.idRemove = data.idR;
    //this.isUnassigned = data.iU;
  }

   
  ngOnInit(): void {
    // console.log("idReqBy",this.idReqBy);
    // console.log("idRemove",this.idRemove);
  }

  closeMe() {
    this.dialogRef.close();
  }

  removeHR() {
    //console.log(this.idEmpTeam.id);
    // console.log(this.idReqBy);
    // console.log(this.idRemove);
    //console.log(this.idEmpTeam);
    //if (!this.isUnassigned){
      const req = new HttpParams()
        .set('id', this.idEmpTeam.id)
        .set('idReqBy', this.idReqBy)
        .set('idRemove',this.idRemove)
      //console.log(req);
      this.sql.postRemoveHR(req);
    // } else{
    //   const req = new HttpParams()
    //     .set('id', this.idEmpTeam.id)
    //   //console.log(req);
    //   this.sql.postRemoveUnassigned(req);
    // }
      
      this.dialogRef.close();
      window.location.reload();
    
  }

}
