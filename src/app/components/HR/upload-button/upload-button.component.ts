import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { CrearEquiposComponent } from 'src/app/components/HR/crear-equipos/crear-equipos.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavbarComponent } from 'src/app/components/shared/navbar/navbar.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.css']
})


export class UploadButtonComponent implements OnInit {
  public fileUploadForm: HTMLFormElement;
  //public hasUpload: boolean = false;

  constructor(
    private dialogRef:  MatDialogRef<UploadButtonComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private uploadFileInfo : AppComponent,
    private fileInfo : CrearEquiposComponent) 
    {
      this.fileUploadForm = data.fileUploadForm;
   }
   

  ngOnInit(): void {
  }

  closeMe() {
    this.dialogRef.close();
  }

  onSubmit() {

    const fData = new FormData();
    fData.append('excel', this.fileUploadForm['get']('myfile').value);

    this.http
      .post<any>('http://localhost:8080/api/upload', fData).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      }
    );
    this.closeMe();
    //this.hasUpload = true;
    this.uploadFileInfo.setHasUpload();
  }

}
