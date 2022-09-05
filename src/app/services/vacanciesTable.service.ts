import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HrVacancyModel} from "../models/hrVacancy.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../humanResource/candidate/cantidateTable/deleteCandidate/dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
@Injectable({
  providedIn: 'root'
})
export class VacanciesTableService {
  private url = 'https://localhost:7141/vacancies';
  private ACCEPT_HEADER = new HttpHeaders({'accept': '*/*', 'access-control-allow-method': 'DELETE, POST, PUT, GET', 'content-type': 'application/json'})
  private ACCEPT_TYPE_HEADER = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http:HttpClient,
              private dialog: MatDialog) {}
  getAllTable(){
    return this.http.get<HrVacancyModel[]>(this.url);
  }
  getTable(idVacancy:number){
    return this.http.get<HrVacancyModel>(this.url + '/' + idVacancy);
  }
  create(table:VacanciesTableService):Observable<VacanciesTableService>{
    return this.http.post<VacanciesTableService>(this.url,table,{headers: this.ACCEPT_TYPE_HEADER});
  }
  update(id:number,table:HrVacancyModel):Observable<HrVacancyModel>{
    return this.http.put<HrVacancyModel>(this.url + '/' +id,table,{headers: this.ACCEPT_TYPE_HEADER});
  }
  openConfirmDialog(msg: string) {

    return this.dialog.open(DialogComponent, {
      width: "390 px",
      disableClose: true,
      data: {
        message: msg
      }
    })
  }
  deleteTable(id: number) {
    return this.http.delete<VacanciesTableService>(`${this.url}/${id}`,{headers: this.ACCEPT_HEADER});
  }

  list(paginator: MatPaginator, sort: MatSort, filter: any):Observable<VacanciesTableService[]> {
    return this.http.get<VacanciesTableService[]>(`${this.url + '?' + this.buildQueryString(paginator, sort, filter)}`, {headers: this.ACCEPT_HEADER});
  }
  buildQueryString(paginator: MatPaginator, sort: MatSort, filter: any) {
    let queryString = '';
    for (const key of Object.keys(filter)) {
      if (filter[key] != '') {
        queryString += key + "=" + filter[key] + "&"
      }
    }

    return queryString;
  }
}
