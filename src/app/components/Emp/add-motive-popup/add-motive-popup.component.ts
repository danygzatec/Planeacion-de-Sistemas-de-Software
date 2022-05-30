import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-add-motive-popup',
  templateUrl: './add-motive-popup.component.html',
  styleUrls: ['./add-motive-popup.component.css']
})
export class AddMotivePopupComponent implements OnInit {

  public members : Employee[];

  /*
  lo que queda por hacer es tener un array de motives, values, etc o refactor para que encaje mejor 
  a lo que necesitamos.
  aqui tambien tenemos que hacer un post con los requests, sería ver cómo hacer un
  query con la información que mandemos.
  */
  

  motive: string[] = [""];

  resultadoPeticion: any;

  public value = "Dear friend,";
  public maxlength = 250;
  public charachtersCount!: number;
  public counter!: string;

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<AddMotivePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.members = data.m;
    }

  ngOnInit(): void {
  }

  public onValueChange(ev: string): void {
    this.charachtersCount = ev.length;
    this.counter = `${this.charachtersCount}/${this.maxlength}`;
  }

  post(){
    for (let i = 0; i < this.members.length; i++) {
      this.http.post('http://localhost:8090/api/requestAdd',
    {
      motive: this.motive[i],
      id_emp_mod: this.members[i].id,
      type: 0,
      id_emp_req:272, // FALTA PONER EL ID DEL QUE ESTA LOGGED IN
      status:1

    })
    .subscribe(data => {this.resultadoPeticion = data;});
    }
    this.dialogRef.close();
  }
}
