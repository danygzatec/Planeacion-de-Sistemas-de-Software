import { Employee } from "./employee";
import { Team } from "./team";

export interface EmployeeTeam {
    employee : Employee,
    team : Team,
    roleMember : number, // peer, leader, team
    statusMember : number, // de las requests
}
