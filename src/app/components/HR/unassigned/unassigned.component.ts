import { Component, OnInit } from '@angular/core';
import { ConsultarEquiposComponent } from '../consultar-equipos/consultar-equipos.component';

@Component({
  selector: 'app-unassigned',
  templateUrl: './unassigned.component.html',
  styleUrls: ['./unassigned.component.css']
})
export class UnassignedComponent implements OnInit {

  constructor(public unassignedInfo : ConsultarEquiposComponent) { }

  searchText: any;

  ngOnInit(): void {
  }

  getUnassigned() {
    var unassignedEmp : any[] = [];

    this.unassignedInfo.employees.forEach(emp => {
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
