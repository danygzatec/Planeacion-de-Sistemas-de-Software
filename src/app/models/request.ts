import { Employee } from "./employee";

export interface Request {
    idRequest : number,
    motive : string,
    status : number,
    type : number,
    requestedBy : Employee,
    employeeModified : Employee,
}
