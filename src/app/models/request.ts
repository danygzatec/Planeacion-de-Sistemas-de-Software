import { Employee } from "./employee";

export interface Request {
    motive : string,
    id_emp_mod : number,
    type : number,
    id_emp_req : number,
    status : number,
    id_request : number,
    requestedBy? : Employee,
    employeeModified? : Employee,
}
