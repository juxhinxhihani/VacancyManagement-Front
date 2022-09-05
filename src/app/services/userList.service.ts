import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {DialogComponent} from "../humanResource/candidate/cantidateTable/deleteCandidate/dialog.component";
import {newUserModel} from "../models/newUser.model";


@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private url = 'https://localhost:7141/register';
  private ACCEPT_HEADER = new HttpHeaders({'Accept': 'application/json'})
  private ACCEPT_TYPE_HEADER = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
              private dialog: MatDialog) {
  }

  getAllTable() {
    return this.http.get<newUserModel>(this.url);
  }

  getTable(id: number) {
    return this.http.get<newUserModel>(this.url + '/' + id);
  }
  getTeamleaders(){
    return this.http.get<newUserModel>("https://localhost:7141/teamleaders");
  }

  create(table: UserListService): Observable<UserListService> {
    return this.http.post<UserListService>(`${this.url}`, table, {headers: this.ACCEPT_TYPE_HEADER});
  }

  update(id: number, fileUpload: newUserModel): Observable<newUserModel> {
    return this.http.put<newUserModel>(`${this.url}/${id}`, fileUpload, {headers: this.ACCEPT_TYPE_HEADER});
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

  // dactivateUser(id: number) {
  //   return
  // }
}
