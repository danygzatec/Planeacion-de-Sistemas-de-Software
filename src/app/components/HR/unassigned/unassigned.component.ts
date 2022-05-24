import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { ConsultarEquiposComponent } from '../consultar-equipos/consultar-equipos.component';

@Component({
  selector: 'app-unassigned',
  templateUrl: './unassigned.component.html',
  styleUrls: ['./unassigned.component.css']
})
export class UnassignedComponent implements OnInit {

  public employees : Employee[];

  constructor(public unassignedInfo : ConsultarEquiposComponent, private http: HttpClient) { 
    this.employees = [];
  }

  searchText: any;

  ngOnInit(): void {
    this.getEmp();
    setTimeout(() => { this.ngOnInit() }, 1000 * 3);
  }

  async getEmp() {
    try {
      this.http.get<any>('http://localhost:8080/api/getEmployees').subscribe(response => {
        this.employees = response;
      }, error => {
        console.log(error);
      });
    } catch (error) {
      console.log("ERROR: GetEmployees: " + error);
    }
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
