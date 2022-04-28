import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { keys } from 'lodash';

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

  constructor(private http : HttpClient, private formBuilder : FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
  }
 

  onFileChange(evt: any) {

    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (evt.target.files.length > 0) {
      const file = evt.target.files[0];
      // console.log(file);

      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile')!.setValue(file);

        console.log(file);
      }
    }

    // this.target = <DataTransfer>(evt.target.files);
    // console.log(this.target);
    // this.form.append("excel", this.target.files)
    // this.onSubmit();
  }

  onSubmit() : any {

    // if (this.target.files !== undefined) {
    //   this.http.post("http://localhost:8080/api/upload", this.form).subscribe(resp => {
    //     console.log("posted excel file to backend via API :)" + resp);
    //   })
    // }

    if (!this.fileUploadForm.get('myfile')!.value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('excel', this.fileUploadForm.get('myfile')!.value);
    


    this.http
      .post<any>('http://localhost:8080/api/upload#excel', formData).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          // Reset the file input
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = undefined;
        }
      }, error => {
        console.log(error);
      });
  }

}
