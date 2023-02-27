import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {HrTableService} from "../../../../services/hrTable.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VERSION} from "@angular/cdk";
import {VacanciesTableService} from "../../../../services/vacanciesTable.service";
import {DatePipe} from "@angular/common";
import {LoginAuthService} from "../../../../services/login-auth.service";
import {UserListService} from "../../../../services/userList.service";

@Component({
  selector: 'app-addCandidate-add-new-humanResource',
  templateUrl: './addVacancy.component.html',
  styleUrls: ['./addVacancy.component.css'],
  providers: [DatePipe]
})
export class AddVacancyComponent implements OnInit {
  id: number = Number();
  percentDone: number | undefined;
  uploadSuccess: boolean | undefined;
  private dateNow: Date;
  selectedCandidate: any = {
    idUser: 0, name: '', surname: ''
  }
  users: any;
  constructor(private http: HttpClient,
              private router: Router,
              private hrService: HrTableService,
              private hrServiceT: VacanciesTableService,
              private _snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private authlogin: LoginAuthService,
              private userList: UserListService) {
  }

  hrForm = new FormGroup({
    vacancy1: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    isActive: new FormControl(false, [Validators.required]),
    dateCreated: new FormControl('ss', [Validators.required]),
    datesaved: new FormControl('s', [Validators.required]),
    idUserCreated: new FormControl(0, [Validators.required]),
    idUserSaved: new FormControl(0, [Validators.required]),
    idTeamLead : new FormControl(0)
  })

  ngOnInit(): void {
    this.showall();
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
    if (this.id) {
      this.hrServiceT.getTable(this.id).subscribe((result) => {
        this.hrForm.patchValue(result)
      })
    }
  }

  onNoClick() {
    this.router.navigate(['hr/vacancies'])
  }

  refresh(): void {
    window.location.origin;
  }

  onSubmit(): void {
    if (this.id) {

      this.hrForm.value.idUserSaved = this.authlogin.getUser(localStorage.getItem('tokenString')).id;
      this.hrForm.value.datesaved = this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.sss");
      if (this.hrForm.valid) {
        console.log(this.hrForm.value.idUserSaved);
        this.hrForm.value.idTeamLead = parseInt((this.hrForm.value.idTeamLead));
        this.hrServiceT.update(this.id, this.hrForm.value)
          .subscribe(() => {
            this._snackBar.open(' Updated Successfully', 'Close', {
              duration: 3000,
              verticalPosition: "bottom",
            });
            this.router.navigate(['hr/vacancies']);
          });
      }
    } else {
      this.hrForm.value.dateCreated = this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.sss");
      this.hrForm.value.datesaved = this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.sss");
      this.hrForm.value.idTeamLead = parseInt((this.hrForm.value.idTeamLead));
      if (this.hrForm.valid) {
        this.hrForm.value.isActive = true;
        this.hrForm.value.idUserCreated = parseInt(this.authlogin.userId());
        this.hrForm.value.idUserSaved = parseInt(this.authlogin.userId());
        console.log(this.hrForm.value.idUserCreated)
        this.http.post<any>("https://localhost:7141/vacancies", this.hrForm.value, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe({
          next:
            res => {
              this.hrForm.reset();
              this.router.navigate(['hr/vacancies']);
            }, error:
            err => {
              alert('Something went wrong')
              this._snackBar.open('Something went wrong', 'Close', {
                duration: 3000,
                verticalPosition: "bottom"
              });
              this.refresh();
            }
        })
      }
      else{
        this._snackBar.open('Form is not valid! Please fill the form!', 'Close', {
          duration: 3000,
          verticalPosition: "bottom"
        });
      }
    }

  }
  formChanged(): void {
    this.selectedCandidate.idUser = parseInt(this.selectedCandidate.idUser);
  }

  showall() {
    return this.userList.getTeamleaders().subscribe(
      (data: any) => {
        this.users = data;
      }
    )
  }

}
