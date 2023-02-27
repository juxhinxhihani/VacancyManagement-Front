import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginAuthService} from "../../../services/login-auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CalendarService} from "../../../services/calendar.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserListService} from "../../../services/userList.service";
import {CalendarModel} from "../../../models/calendar.model";
import {delay, take} from "rxjs/operators";
import {HrTableService} from "../../../services/hrTable.service";
import {HrCandidateModel} from "../../../models/hrCandidate.model";

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css'],
  providers: [DatePipe]
})
export class ScheduleFormComponent implements OnInit {
  selectedUser: any = {
    Id_Teamleader: 0, name: '', surname: ''
  }
  id: number;
  users: any;
  detail: string;
  constructor(private loginAuth : LoginAuthService,
              private http: HttpClient,
              private candidateService : HrTableService,
              private userlist : UserListService,
              private router: Router,
              private datePipe : DatePipe,
              private _snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private calendarService:CalendarService,
              @Inject(MAT_DIALOG_DATA) public data : {element : any}
  ) { }

  scheduleForm = new FormGroup({
    Id_Teamleader: new FormControl(0),
    id_Candidate1 : new FormControl(0, [Validators.required]),
    id_Vacancy: new FormControl(0, [Validators.required]),
    start_Time : new FormControl('s', [Validators.required]),
    end_Time : new FormControl('s', [Validators.required]),

  });
  ngOnInit(): void {
    this.showall();
    this.getDetails();
  }
  refresh(): void {
    window.location.reload();
  }
  onSubmit() {
    this.scheduleForm.value.id_Candidate1 = parseInt(this.data.element.idCandidate);
    this.scheduleForm.value.id_Vacancy = parseInt(this.data.element.idVacancy);
    this.scheduleForm.value.Id_Teamleader = parseInt(this.scheduleForm.value.Id_Teamleader);
    this.scheduleForm.value.start_Time = this.datePipe.transform(this.scheduleForm.value.start_Time, "yyyy-MM-dd'T'HH:mm:ss.sss");
    this.scheduleForm.value.end_Time = this.datePipe.transform(this.scheduleForm.value.end_Time, "yyyy-MM-dd'T'HH:mm:ss.sss");
    if (this.scheduleForm.valid){
      this.calendarService.create( this.scheduleForm.value)
        .subscribe({ next :
            response => {
            if (response){
              debugger
              this.http.delete('https://localhost:7141/deleteVacancyCandidate/?id='+ parseInt(this.data.element.idVacancyCanddate), {headers:new HttpHeaders({'Accept': 'application/json'})}).
              subscribe({
                next:
                  res => {
                    this._snackBar.open('Calendar Added Successfully', 'Close', {
                      duration: 3000,
                      verticalPosition: "bottom"
                    });
                    this.refresh();
                  }
            })};
          }, error :
          err => {
            console.log(err)
            this._snackBar.open('Something went wrong', 'Close', {
              duration: 3000,
              verticalPosition: "bottom"
            });
            // this.refresh();
          }})
    }else{
      this._snackBar.open('Form not valid!', 'Close', {
        duration: 3000,
        verticalPosition: "bottom"
      });
    }
  }
  showall() {
    return this.userlist.getTeamleaders().subscribe(
      (data: any) => {
        this.users = data;
      }
    )
  }
  formChanged(): void {
    this.selectedUser.idUser = parseInt(this.selectedUser.idUser);
  }
  getDateTime(): string {
    return this.datePipe.transform(new Date(), "yyyy-MM-dd'T'hh:mm");
  }
  getDetails(): any{
    this.candidateService.getTable(this.data.element.idCandidate).subscribe({next: value => {
      this.detail = value.candidateName + " " + value.candidateSurname;
      console.log(this.detail)
      }});
  }

}
