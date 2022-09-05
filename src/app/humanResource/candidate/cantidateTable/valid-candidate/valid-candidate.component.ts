import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTable} from "@angular/material/table";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {HrCandidateModel} from "../../../../models/hrCandidate.model";
import {LoginAuthService} from "../../../../services/login-auth.service";
import {HrTableService} from "../../../../services/hrTable.service";
import {InfoComponent} from "../info/info.component";
import {ScheduleFormComponent} from "../../../schedule/scheduleForm/schedule-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {ValidService} from "../../../../services/valid.service";
import {ValidModel} from "../../../../models/valid.model";
import {InterviewResultComponent} from "../../../schedule/interview-result/interview-result.component";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-valid-candidate',
  templateUrl: './valid-candidate.component.html',
  styleUrls: ['./valid-candidate.component.css']
})
export class ValidCandidateComponent implements OnInit {

  element: ValidModel | undefined;

  displayedColumnsHr: string[] = ['CandidateName', 'idVacancy', 'action'];
  displayedColumnsTl: string[] = ['CandidateName', 'CandidateSurname', 'CandidateCv', 'action'];
  validTable: ValidModel;
  tableData: any;
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

  constructor(private router: Router,
              private hrService: HrTableService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private http: HttpClient,
              private loginAuth: LoginAuthService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private datePipe: DatePipe,
              private validService: ValidService
  ) {
  }


  ngOnInit(): void {
    this.validService.getAllTable().subscribe((allData) => {
      console.log(allData)
      this.validTable = allData;
    });

    this.filterForm = this.formBuilder.group({
      CandidateName: [""],
    });
    this.validService.list(this.paginator, this.sort, this.filterForm.value).subscribe((response: any) => {
      this.tableData = new MatTableDataSource<ValidCandidateComponent>(response);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;

    });

  }

  onChange(element: any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(InfoComponent, {
        width: '70%', height: '29%', autoFocus: true, data: {
          element: element
        }
      }
    );
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

  getRole(): string {
    this.role = this.loginAuth.getUser(localStorage.getItem('tokenString')).idRole;
    return this.role;
  }

//filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  scheduleInterview(element: any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(ScheduleFormComponent, {
        panelClass: 'full-width-dialog', data: {
          element: element
        }
      }
    ).afterClosed().subscribe({
      next: value => {
        this.ngOnInit();
      }
    });
  }
}

