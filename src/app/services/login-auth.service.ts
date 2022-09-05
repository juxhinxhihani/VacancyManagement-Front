import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserRolesModel} from "../models/userRoles.model";

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  url = "https://localhost:7141/api/Auth/login";
  constructor(private http : HttpClient) { }
  login(email : any, password:any){
    return this.http.post(this.url, {
        "email": email,
        "password": password
      }
    );

  }
  isLoggedIn(){
    return localStorage.getItem('tokenString') != null;
  }
  getUser(token : string): UserRolesModel{
    return JSON.parse(atob(token.split(".")[1])) as UserRolesModel;
  }
  userId(): any {
    return this.getUser(this.getToken()).id;
  }
  getToken() : string {
     return localStorage.getItem('tokenString');
  }
}
//eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJzdHJpbmciLCJOYW1lIjoic3RyaW5nIiwiU3VybmFtZSI6InN0cmluZyIsInJvbGUiOiIxIiwibmJmIjoxNjQ4ODAyMDc3LCJleHAiOjE2NDg4ODg0NzcsImlhdCI6MTY0ODgwMjA3N30.vTMOkEs_ULm_fRme5YoI5cJIDZRn0OW5ImimlEL2y8hYId24WGy5E-flqWg0NB27QI53a2aGlL7_4w141Xex-Q
