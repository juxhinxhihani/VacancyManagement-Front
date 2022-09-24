import {Component, Inject, OnInit} from '@angular/core';
import {HrTableService} from "../../../services/hrTable.service";
import {LoginAuthService} from "../../../services/login-auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-move-blacklist',
  templateUrl: './move-blacklist.component.html',
  styleUrls: ['./move-blacklist.component.css'],
  providers: [DatePipe]
})
export class MoveBlacklistComponent implements OnInit {
  private role: string;

  constructor(private hrService : HrTableService,
              private http : HttpClient,
              private router : Router,
              private loginAuth : LoginAuthService,
              private _snackBar: MatSnackBar,
              private datePipe : DatePipe,
              @Inject(MAT_DIALOG_DATA) public data: {element: any}) { }
  getRole(): string{
    this.role = this.loginAuth.getUser(localStorage.getItem('tokenString')).idRole;
    return this.role;
  }
  blacklistForm = new FormGroup({
    reason : new FormControl('', [Validators.required]),
    idCandidate : new FormControl(parseInt(this.data.element.idCandidate), [Validators.required]),
    idUserCreated : new FormControl(parseInt(this.loginAuth.userId()), [Validators.required]),
    datetimeCreated : new FormControl('s', [Validators.required])
});
  ngOnInit(): void {
    this.hrService.getAllTable().subscribe((allData) => {

    });
  }

  moveBlacklist() {
    if(this.blacklistForm.valid) {
      this.blacklistForm.value.datetimeCreated = this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.sss");
      this.http.post<any>("https://localhost:7141/blacklist", this.blacklistForm.value, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe({
        next:
          res => {
            this.hrService.deleteTable(parseInt(this.data.element.idCandidate)).subscribe((result) => {
              console.log(result);
              this.ngOnInit();
            });
           // window.location.reload();
          }, error:
          err => {
            this._snackBar.open('Something went wrong', 'Close', {
              duration: 3000,
              verticalPosition: "bottom"
            });
          }
      })

    }
    else {
      this._snackBar.open('Invalid Form', 'Close', {
        duration: 3000,
        verticalPosition: "bottom"
      });
    }

  }
}
