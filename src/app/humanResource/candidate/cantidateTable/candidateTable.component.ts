import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTable} from "@angular/material/table";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HrTableService} from "../../../services/hrTable.service";
import {HrCandidateModel} from "../../../models/hrCandidate.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginAuthService} from "../../../services/login-auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {InfoComponent} from "./info/info.component";
import {MoveBlacklistComponent} from "../../../teamLeader/candidate/move-blacklist/move-blacklist.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ValidService} from "../../../services/valid.service";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";
import {InterviewResultComponent} from "../../schedule/interview-result/interview-result.component";

@Component({
  selector: 'app-candidateTable',
  templateUrl: './candidateTable.component.html',
  styleUrls: ['./candidateTable.component.css'],
  providers: [DatePipe]
})
export class CandidateTableComponent implements OnInit {

  displayedColumnsHr: string[] = ['CandidateName', 'CandidateSurname', 'email', 'action'];
  displayedColumnsTl: string[] = ['CandidateName', 'CandidateSurname', 'email', 'CandidateCv', 'action'];
  tableData!: MatTableDataSource<CandidateTableComponent>;
  hrTable: HrCandidateModel[];
  newSize = 0;
  newPageSize = 10;
  highlightedRows = [];
  highlightedRowss = {};
  isDisabled = false;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table', {static: false}) table: MatTable<any>;
  @ViewChild('filter', {static: false}) filter: ElementRef;

  filterForm: FormGroup = new FormGroup({});

  role: string;
  isValid: any;
  constructor(private router: Router,
              private hrService: HrTableService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private http: HttpClient,
              private loginAuth : LoginAuthService,
              private dialog : MatDialog,
              private _snackBar: MatSnackBar,
              private  validService : ValidService,
              private datePipe : DatePipe
  ) {
  }
  validForm = new FormGroup({
    idVacancy: new FormControl(0, [Validators.required]),
    idCandidate: new FormControl(0, [Validators.required]),
    isValid: new FormControl(false, [Validators.required]),
    dateCreated : new FormControl('s', [Validators.required]),
    datetimeValidated : new FormControl('s', [Validators.required]),
    idUserValidate : new FormControl(0, [Validators.required]),
  });
  ngOnInit(): void {
    this.hrService.getAllTable().subscribe((allData) => {
      console.log(allData)
      this.hrTable = allData;
    });
    this.filterForm = this.formBuilder.group({
      CandidateName: [""],
    });
    this.hrService.list(this.paginator, this.sort, this.filterForm.value).subscribe((response: any) => {
      this.tableData = new MatTableDataSource<CandidateTableComponent>(response);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;

    });
  }

  showDetails(element : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(InfoComponent, {width : '70%', height: '29%', data : {
      element: element} }
    );
  }

  makevalid(element:any) {
    this.validForm.value.idVacancy = element.id_Vacancy1;
    this.validForm.value.idCandidate = element.idCandidate;
    this.validForm.value.isValid = true;
    this.validForm.value.datetimeValidated = this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.sss");
    this.validForm.value.dateCreated = element.dateCreated;
    this.validForm.value.idUserValidate = this.loginAuth.userId();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.hrService.openConfirmDialog('Are you sure you want to move '+ element.candidateName +' '+ element.candidateSurname +' as valid ?')
      .afterClosed().subscribe((res => {
        // this.highlightedRows.push(element);
        // this.highlightedRowss[element.id] = !this.highlightedRowss[element.id];
      if (res) {
        this.http.post<any>("https://localhost:7141/vacancyCandidates", this.validForm.value, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe({
          next:
            res => {
            }, error:
            err => {
            console.log(err)
              this._snackBar.open('Something went wrong', 'Close', {
                duration: 3000,
                verticalPosition: "bottom"
              });
            }
        })
        this.router.navigate(['tl/candidates'])
      }

    }))
    this.ngOnInit();
  }

  onAdd() {
    this.router.navigate(['hr/candidates/add'])
  }

  update(element: HrCandidateModel) {
    this.router.navigate(['hr/candidates/add/' + element])
  }

  deleteTable(id: number) {
    this.hrService.openConfirmDialog('Are you sure you want to delete it?')
      .afterClosed().subscribe((res => {
      if (res) {
        this.hrService.deleteTable(id).subscribe((result) => {
          console.log(result);
          this.ngOnInit();
        });
      }

    }))
    this.router.navigate(['hr/candidates'])
  }
  getRole(): string{
    this.role = this.loginAuth.getUser(localStorage.getItem('tokenString')).idRole;
    return this.role;
  }

//filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }


  moveBlacklist(element : any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(MoveBlacklistComponent, {panelClass: 'full-width-dialog',  data : {
        element: element} }
    ).afterClosed().subscribe({next: value =>{
      if (value){
        this.ngOnInit();
      }
      }
    })
    this.router.navigate(['tl/candidates'])

  }
}
