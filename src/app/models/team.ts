import { Employee } from "./employee";
import { EvaluationPeriod } from "./evaluation-period";

export interface Team {
    id : number,
    id_employee : number,
    id_period : number,
    approved_HR : boolean,
    approved_Emp : boolean,
    employee? : Employee,
    period? : EvaluationPeriod
}
