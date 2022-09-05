import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {HrCandidateModel} from "../models/hrCandidate.model";
import {Observable} from "rxjs";
import {DialogComponent} from "../humanResource/candidate/cantidateTable/deleteCandidate/dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ValidModel} from "../models/valid.model";

@Injectable({
  providedIn: 'root'
})
export class ValidService {
  private url = 'https://localhost:7141/candidatesValid';
  private ACCEPT_HEADER = new HttpHeaders({'Accept': 'application/json'})
  private ACCEPT_TYPE_HEADER = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http:HttpClient,
              private dialog: MatDialog) { }

  getAllTable(){
    return this.http.get<ValidModel>(this.url);
  }
  getTable(id:number){
    return this.http.get<ValidModel>(this.url + '/' + id);
  }
  // getValid(id:number){
  //   return (this.http.get<ValidModel>(this.url + '/' + id)).subscribe({next : value => {
  //     if(value.isValid != null){
  //       return value.isValid;
  //     }
  //     else{
  //       return false;
  //     }
  //     }});
  // }
  create(table:ValidService):Observable<ValidService>{
    return this.http.post<ValidService>(`${this.url}`,table,{headers: this.ACCEPT_TYPE_HEADER});
  }
  update(id:number, fileUpload:ValidModel): Observable<ValidModel>{
    return this.http.put<ValidModel>(`${this.url}/${id}`, fileUpload, {headers: this.ACCEPT_TYPE_HEADER});
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
    return this.http.delete<ValidService>(`${this.url}/${id}`,{headers:this.ACCEPT_HEADER});
  }

  // upload file
//   upload(file): Observable<any> {
//     // Create form data
//     const formData = new FormData();
//
//     // Store form name as "file" with file data
//     formData.append("file", file, file.name);
//
//     // Make http post request over api
//     // with formData as req
//     return this.http.post(this.url, formData);
//   }
  list(paginator: MatPaginator, sort: MatSort, filter: any):Observable<ValidService[]> {
    return this.http.get<ValidService[]>(`${this.url + '?' + this.buildQueryString(paginator, sort, filter)}`, {headers: this.ACCEPT_HEADER});
  }
  buildQueryString(paginator: MatPaginator, sort: MatSort, filter: any) {
    let queryString = '';
    for (const key of Object.keys(filter)) {
      if (filter[key] != '') {
        queryString += key + "=" + filter[key] + "&"
      }
    }

    return queryString;
  }}
