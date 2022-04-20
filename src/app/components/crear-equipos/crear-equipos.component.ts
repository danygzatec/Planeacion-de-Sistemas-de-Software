import { Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@ViewChild('takeInput', {static: false})

@Component({
  selector: 'app-crear-equipos',
  templateUrl: './crear-equipos.component.html',
  styleUrls: ['./crear-equipos.component.css']
})

export class CrearEquiposComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 

  onFileChange(evt: any) {
    const target : DataTransfer = <DataTransfer>(evt.target.files);
    if (target.files.length !== 1) throw new Error("Cannot use multiple files!");
  }

}
