import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { UploadButtonComponent } from '../upload-button/upload-button.component';

@ViewChild('takeInput', {static: false})

@Component({
  selector: 'app-crear-equipos',
  templateUrl: './crear-equipos.component.html',
  styleUrls: ['./crear-equipos.component.css']
})

export class CrearEquiposComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: any;
  fileUploadForm: any;
  fileInputLabel: any;
  formData : FormData = new FormData();

  constructor(
    private formBuilder : FormBuilder, 
    private  dialogRef : MatDialog) {}

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
  }

  onFileChange(evt: any) {

    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (evt.target.files.length > 0) {
      const file = evt.target.files[0];
      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile')!.setValue(file);

        console.log(file);
      }
    }
  }

  resetFile() : void {
    this.fileInputLabel = undefined;
    console.log('file reset!');
  }

  openDialog(fileUploadForm : any) : any {

    if (this.fileInputLabel == null || this.fileInputLabel == undefined) {
      console.log('please upload a file!');
      alert('Please upload a file!');
      return false;
    }

    this.dialogRef.open(UploadButtonComponent,{
      data : {
        fileUploadForm : fileUploadForm
      }
    });
  }
}
