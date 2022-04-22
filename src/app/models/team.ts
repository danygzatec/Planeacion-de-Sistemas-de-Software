import { Employee } from "./employee";
import { EvaluationPeriod } from "./evaluation-period";

export interface Team {
    id_employee : number,
    id_period : number,
    approved_HR : boolean,
    approved_Emp : boolean,
    id_team : number,
    employee? : Employee,
    period? : EvaluationPeriod
}
