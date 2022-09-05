import {Component, OnInit, Output} from '@angular/core';
import {HttpClient,} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HrTableService} from "../../../../services/hrTable.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VacanciesTableService} from "../../../../services/vacanciesTable.service";
import {DatePipe} from "@angular/common";
import {LoginAuthService} from "../../../../services/login-auth.service";


@Component({
  selector: 'app-addCandidate',
  templateUrl: './addCandidate.component.html',
  styleUrls: ['./addCandidate.component.css'],
  providers: [DatePipe]
})
export class AddCandidateComponent implements OnInit {
  id: number = Number();//fshije me von
  isUpdate: boolean = false;
  vacancies: any;
  selected: any;
  selectedVacancy: any = {
    idVacancy: 0, vacancy1: ''
  }
  private cv: string | ArrayBuffer;
  private candcv: any;

  constructor(private http: HttpClient,
              private router: Router,
              private loginAuth : LoginAuthService,
              private datePipe : DatePipe,
              private hrService: HrTableService,
              private _snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private vacanciesService: VacanciesTableService
  ) {
  }

  get f() {
    return this.hrForm.controls;
  }

  // upload file
  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.hrForm.patchValue({
        fileSource: file
      });
    }
  }

  hrForm = new FormGroup({
    candidateName: new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z]+")]),
    candidateSurname: new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z]+")]),
    candidateMobile: new FormControl('', [Validators.required, Validators.pattern("^(00355|\\+355|0)[0-9]{9}$")]),
    candidateEmail: new FormControl('', [Validators.required, Validators.email]),
    id_Vacancy1: new FormControl(0),
    //candidateCv: new FormControl(''),
    dateCreated: new FormControl('s'),
    dateSaved : new FormControl('s'),
    idUserCreated : new FormControl('s'),
    idUserLastSaved : new FormControl('s'),
  })
  ngOnInit(): void {
    this.showall();
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
    if (this.id) {
      this.hrService.getTable(this.id).subscribe((result) => {
        this.hrForm.patchValue(result)
      })
    }
  }

  onNoClick() {
    this.router.navigateByUrl('hr/candidates')
  }

  refresh(): void {
    window.location.reload();
  }

  onSubmit() {
    if (this.id){
      //this.hrForm.value.idUserLastSaved = parseInt(this.loginAuth.userId());
      //this.hrForm.value.candidateCv = this.cv;
      if (this.hrForm.valid) {
        this.hrForm.value.datecreated = this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.sss");
        console.log(this.hrForm.value);
        this.hrService.update(this.id, this.hrForm.value)
          .subscribe(() => {
            this._snackBar.open(' Updated Successfully', 'Close', {
              duration: 3000,
              verticalPosition: "bottom",
            });
            this.router.navigate(['hr/candidates']);
          });
      }
    }
    else {
      //this.hrForm.value.candidateCv = this.cv;
      if (this.hrForm.valid) {
      this.hrForm.value.idUserLastSaved = parseInt(this.loginAuth.userId());
      this.hrForm.value.idUserCreated = parseInt(this.loginAuth.userId());
      this.hrForm.value.id_Vacancy1 = parseInt(this.hrForm.value.id_Vacancy1);
      this.hrForm.value.dateSaved = this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.sss");
      this.hrForm.value.dateCreated = this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.sss");
        console.log(this.hrForm.value)
          this.hrService.create(this.hrForm.value)
            .subscribe((response) => {
                console.log(response);

                this._snackBar.open(' Added Successfully', 'Close', {
                  duration: 3000,
                  verticalPosition: "bottom"
                });
                this.router.navigate(['hr/candidates']);
              },
              (error) => {
                console.log(error);
                this._snackBar.open(error, 'Close', {
                  duration: 9000,
                  verticalPosition: "bottom"
                });

              });
        }
      }
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      // this.cv = JSON.stringify(reader.result).split(',')[1];
      // console.log(this.cv)
    };
  }

  formChanged(): void {
    this.selectedVacancy.id = parseInt(this.selectedVacancy.id);
  }

  showall() {
    return this.vacanciesService.getAllTable().subscribe(
      (data: any) => {
        this.vacancies = data;
      }
    )
  }

}
