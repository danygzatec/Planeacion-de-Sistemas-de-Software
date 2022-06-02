import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { SqlService } from 'src/app/services/sql.service';
import { ConsultarEquiposComponent } from '../consultar-equipos/consultar-equipos.component';

@Component({
  selector: 'app-unassigned',
  templateUrl: './unassigned.component.html',
  styleUrls: ['./unassigned.component.css']
})
export class UnassignedComponent implements OnInit {

  public employees : Employee[];

  constructor(
    public unassignedInfo : ConsultarEquiposComponent, 
    private sql : SqlService) { 
    this.employees = [];
  }

  searchText: any;

  ngOnInit(): void {
    
    this.sql.getUnassigned().subscribe((resp) => {
      this.employees = resp;

    })

    //setTimeout(() => { this.ngOnInit() }, 1000 * 3);
  }

  fireEvent(e : any) {
    e.preventDefault();
    //console.log('problema en equipo individual');
    return false;
  }

}
