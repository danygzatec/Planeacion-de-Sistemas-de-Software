import { Employee } from "./employee";
import { EvaluationPeriod } from "./evaluation-period";

export interface Project {
    project_name : string,
    id_employee_leader : number,
    id_period : number,
    id_project : number,
    leader? : Employee,
    period? : EvaluationPeriod
}
