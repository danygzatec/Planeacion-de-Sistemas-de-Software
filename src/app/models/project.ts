import { Employee } from "./employee";
import { EvaluationPeriod } from "./evaluation-period";

export interface Project {
    idProject : number,
    projectName : string,
    leader : Employee,
    period : EvaluationPeriod
}
