import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HrCandidateModel} from "../models/hrCandidate.model";
import {catchError, Observable, of} from "rxjs";
import {CalendarModel} from "../models/calendar.model";
import {DialogComponent} from "../humanResource/candidate/cantidateTable/deleteCandidate/dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private url = 'https://localhost:7141/schedules';
  private ACCEPT_HEADER = new HttpHeaders({'Accept': 'application/json'})
  private ACCEPT_TYPE_HEADER = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http:HttpClient,
              private dialog: MatDialog) { }

  getTableInfos() : Observable<any[] | CalendarModel[]>{
    return this.http.get<CalendarModel[]>(this.url).pipe(catchError(this.handleError('getCalendars', [])));
  }
  create(table:CalendarService):Observable<CalendarService>{
    return this.http.post<CalendarService>(`${this.url}`,table,{headers: this.ACCEPT_TYPE_HEADER});
  }

  deleteTable(id: number) {
    return this.http.delete<CalendarService>(`${this.url}/${id}`,{headers:this.ACCEPT_HEADER});
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
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

  list(paginator: MatPaginator, sort: MatSort, filter: any):Observable<CalendarService[]> {
    return this.http.get<CalendarService[]>(`${this.url + '?' + this.buildQueryString(paginator, sort, filter)}`, {headers: this.ACCEPT_HEADER});
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
