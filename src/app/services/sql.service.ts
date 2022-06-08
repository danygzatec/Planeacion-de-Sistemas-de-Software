import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { EmployeeProject } from '../models/employee-project';
import { EmployeeTeam } from '../models/employee-team';
import { EvaluationPeriod } from '../models/evaluation-period';
import { Project } from '../models/project';
import { Request } from '../models/request';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})

export class SqlService {

  constructor(private http: HttpClient) { }

  private _fullPath: string = `${environment.baseURL}${environment.baseAPI}`;

  getEmployees() {
    return this.http
      .get<Employee[]>(`${this._fullPath}/getEmployees`)
      .pipe(
        map((resp) => {
          return resp;
        })
      );

  }

  getAllEmployees() {
    return this.http
      .get<Employee[]>(`${this._fullPath}/getAllEmployees`)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  getTeams() {

    return this.http
      .get<Team[]>(`${this._fullPath}/getTeams`)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  getProjects() {

    return this.http
      .get<Project[]>(`${this._fullPath}/getProjects`)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  getEmployeeTeams() {
    return this.http
      .get<EmployeeTeam[]>(`${this._fullPath}/getEmployeeTeams`)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  getEmployeeProjects() {
    return this.http
      .get<EmployeeProject[]>(`${this._fullPath}/getEmployeeProjects`)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  getRequests() {
    return this.http
      .get<Request[]>(`${this._fullPath}/getRequests`)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  getEvaluationPeriods() {
    return this.http
      .get<EvaluationPeriod[]>(`${this._fullPath}/getEvaluationPeriods`)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  postExcelFile(fData : FormData) {

    console.log("trying to upload");

    this.http.post<any>(`${this._fullPath}/upload`, fData).subscribe((resp) => {
      console.log(resp);
    }, (error) => {
      console.log(error);
    })
  }

  getHasUploaded() {
    return this.http
    .get<any>(`${this._fullPath}/getHasUploaded`)
    .pipe(
      map((resp) => {
        //console.log(resp[0].has_uploaded , "SQL");
        if (resp[0] === undefined) {
          return false;
        }
        return resp[0].has_uploaded;
      })
    );
  }

  postReq(params : HttpParams) {
    console.log("sending requests to backend server");

    this.http.post<any>(`${this._fullPath}/requestAdd`, params).subscribe((resp) => {
      console.log(resp);
      console.log("requests sent to backend successfully!");
    }, (error) => {
      console.log(error);
    })
  }

  postRemoveHR(params : HttpParams) {
    console.log("sending remove to backend server");

    this.http.post<any>(`${this._fullPath}/removeHR`, params).subscribe((resp) => {
      console.log(resp);
      console.log("remove sent to backend successfully!");
    }, (error) => {
      console.log(error);
    })
  }

  postApproveHR(params : HttpParams) {
    console.log("sending approve to backend server");

    this.http.post<any>(`${this._fullPath}/approveHR`, params).subscribe((resp) => {
      console.log(resp);
      console.log("approve sent to backend successfully!");
    }, (error) => {
      console.log(error);
    })
  }

  postReqRemove(params : HttpParams) {
    console.log("sending requests to backend server");

    this.http.post<any>(`${this._fullPath}/requestRemove`, params).subscribe((resp) => {
      console.log(resp);
      console.log("requests sent to backend successfully!");
    }, (error) => {
      console.log(error);
    })
  }

  getUnassigned() {
    return this.http
    .get<Employee[]>(`${this._fullPath}/getOrphanEmployees`)
    .pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  getUnassignedTeams() {
    return this.http
    .get<EmployeeTeam[]>(`${this._fullPath}/getOrphanTeams`)
    .pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  postDeclineRequest(params : HttpParams) {
    //console.log("sending request to decline request to backend server");

    this.http.post<any>(`${this._fullPath}/declineRequest`, params).subscribe((resp) => {
      console.log(resp);
      //console.log("requests sent to backend successfully!");
    }, (error) => {
      console.log(error);
    })
  }

  postAcceptRequest(params : HttpParams) {
    console.log("sending accept request to backend server");

    this.http.post<any>(`${this._fullPath}/acceptRequest`, params).subscribe((resp) => {
      console.log(resp);
      console.log("accept request sent to backend successfully!");
    }, (error) => {
      console.log(error);
    })
  }

  postAddHR(params : HttpParams) {
    console.log("sending accept to backend server");

    this.http.post<any>(`${this._fullPath}/addHR`, params).subscribe((resp) => {
      console.log(resp);
      console.log("accept sent to backend successfully!");
    }, (error) => {
      console.log(error);
    })
  }

  postRemoveUnassigned(params : HttpParams) {
    console.log("sending remove unassigned to backend server");

    this.http.post<any>(`${this._fullPath}/removeUnassigned`, params).subscribe((resp) => {
      console.log(resp);
      console.log("remove unassigned sent to backend successfully!");
    }, (error) => {
      console.log(error);
    })
  }

  postAddUnassigned(params : HttpParams) {
    console.log("sending add unassigned to backend server");

    this.http.post<any>(`${this._fullPath}/addUnassigned`, params).subscribe((resp) => {
      console.log(resp);
      console.log("add unassigned sent to backend successfully!");
    }, (error) => {
      console.log(error);
    })
  }

  postCreateTeamUnassigned(params : HttpParams) {
    console.log("sending create team unassigned to backend server");

    this.http.post<any>(`${this._fullPath}/createTeamUnassigned`, params).subscribe((resp) => {
      console.log(resp);
      console.log("create team unassigned sent to backend successfully!");
    }, (error) => {
      console.log(error);
    })
  }

  postAddUnassignedToTeam(params : HttpParams) {
    console.log("sending add unassigned to team to backend server");

    this.http.post<any>(`${this._fullPath}/addUnassignedToTeam`, params).subscribe((resp) => {
      console.log(resp);
      console.log("add unassigned to team sent to backend successfully!");
    }, (error) => {
      console.log(error);
    })
  }

  postApproveEmp(params : HttpParams) {
    console.log("sending approve Emp to backend server");

    this.http.post<any>(`${this._fullPath}/approveEmp`, params).subscribe((resp) => {
      console.log(resp);
      console.log("approve Emp sent to backend successfully!");
    }, (error) => {
      console.log(error);
    })
  }


}
