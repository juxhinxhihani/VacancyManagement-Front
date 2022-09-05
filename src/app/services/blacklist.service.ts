import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HrCandidateModel} from "../models/hrCandidate.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HrTableService} from "./hrTable.service";

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {
  private url = 'https://localhost:7141/blacklist';
  private ACCEPT_HEADER = new HttpHeaders({'Accept': 'application/json'})
  private ACCEPT_TYPE_HEADER = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient,
              private hrTableService : HrTableService) { }

  getAll(): Observable<BlacklistService[]> {
    return this.http.get<BlacklistService[]>(this.url)
  }

  getElementById(id: number): Observable<HrCandidateModel> {
    return this.http.get<HrCandidateModel>(this.url)
  }
  update(id: number, body: any) {
    return this.http.put<BlacklistService>(this.url, body);
  }

  create(blService: BlacklistService): Observable<BlacklistService> {
    return this.http.post<BlacklistService>(this.url, blService)
  }
  list(paginator: MatPaginator, sort: MatSort, filter: any):Observable<BlacklistService[]> {
    return this.http.get<BlacklistService[]>(`${this.url + '?' + this.hrTableService.buildQueryString(paginator, sort, filter)}`, {headers: this.ACCEPT_HEADER});
  }
}
