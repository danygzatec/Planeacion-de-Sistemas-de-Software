import { Employee } from "./employee";
import { Team } from "./team";

export interface EmployeeTeam {
    id : number
    role_member : number, // 0 leader, 1 peer, 2 team
    status_member : number, // de las requests
    id_employee : number,
    id_team : number,
    employee? : Employee,
    team? : Team,
    role_member_string? : string;
    status_member_string? : string;
}
