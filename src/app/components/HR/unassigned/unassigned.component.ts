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
    
    this.sql.getEmployees().subscribe((resp) => {
      this.employees = resp;
      console.log("GetEmployees from API successful!");
    })

    //setTimeout(() => { this.ngOnInit() }, 1000 * 3);
  }

  getEmp() {
    this.sql.getEmployees().subscribe((resp) => {
      this.employees = resp;
    })
  }

  getUnassigned() {
    var unassignedEmp : any[] = [];

    this.employees.forEach(emp => {
      if (!emp.is_assigned) {
        unassignedEmp.push(emp);
      }
    })

    return unassignedEmp;
  }

  fireEvent(e : any) {
    e.preventDefault();
    //console.log('problema en equipo individual');
    return false;
  }

}
