import { Employee } from "./employee";

export interface Request {
    id : number
    motive : string,
    id_emp_mod : number,
    type : number,
    id_emp_req : number,
    status : number,
    requestedBy? : Employee,
    employeeModified? : Employee,
    title? : string
}
