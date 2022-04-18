import { Employee } from "./employee";
import { EvaluationPeriod } from "./evaluation-period";

export interface Team {
    idTeam : number,
    approvedEmp : boolean,
    approvedHR : boolean,
    employee : Employee,
    period : EvaluationPeriod
}
