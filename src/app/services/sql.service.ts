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


}
