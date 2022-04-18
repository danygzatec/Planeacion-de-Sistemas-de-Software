import { Employee } from "./employee";
import { Project } from "./project";

export interface EmployeeProjects {
    employee : Employee,
    project  : Project,
    didComplete : boolean, 
    projectRole : number,
    // maybe agregar id employeeproject ?
}
