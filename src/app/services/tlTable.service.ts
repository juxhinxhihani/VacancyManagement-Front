import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {TlCandidateModel} from "../models/tlCandidate.model";
@Injectable({
  providedIn: 'root'
})
export class TlTableService {
  private url = 'http://localhost:3000/tl-table';
  private ACCEPT_HEADER = new HttpHeaders({'Accept': 'application/json'})
  private ACCEPT_TYPE_HEADER = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http:HttpClient,
              private dialog: MatDialog) {}
  getAllTable(){
    return this.http.get<TlCandidateModel[]>(this.url);
  }
  getTable(id:number){
    return this.http.get<TlCandidateModel>(this.url + '/' + id);
  }
  create(table:TlTableService):Observable<TlTableService>{
    return this.http.post<TlTableService>(`${this.url}`,table,{headers: this.ACCEPT_TYPE_HEADER});
  }
  update(id:number,table:TlCandidateModel):Observable<TlCandidateModel>{
    return this.http.put<TlCandidateModel>(`${this.url}`,table,{headers: this.ACCEPT_TYPE_HEADER});
  }
}
