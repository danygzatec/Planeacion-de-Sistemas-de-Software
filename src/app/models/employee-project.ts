import { Employee } from "./employee";
import { Project } from "./project";

export interface EmployeeProject {
    id : number
    did_complete : boolean,
    project_role : number,
    id_employee : number,
    id_project : number,
    billHrs : number,
    nonBillHrs : number,
    employee? : Employee,
    project?  : Project[],
}
