import { Employee } from "./employee";
import { EvaluationPeriod } from "./evaluation-period";

export interface Project {
    id: number
    project_name : string,
    id_employee_leader : number,
    id_period : number,
    leader? : Employee,
    period? : EvaluationPeriod
}
