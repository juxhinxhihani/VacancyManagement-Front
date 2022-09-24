import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {InterviewResultComponent} from "./interview-result/interview-result.component";
import {Router} from "@angular/router";
// import {DatePipe} from "@angular/common";
import {CalendarService} from "../../services/calendar.service";
import {CalendarModel} from "../../models/calendar.model";
import {share, take} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginAuthService} from "../../services/login-auth.service";


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
  // providers: [DatePipe]
})
export class ScheduleComponent implements OnInit {
  displayedColumns = ['TeamLeader', 'Candidate', 'Position', 'StartTime', 'Endtime', 'Action'];
  displayedColumnTL = ['TeamLeader', 'Candidate', 'Position', 'StartTime', 'Endtime'];
  calendarTable: MatTableDataSource<ScheduleComponent>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table', {static: false}) table: MatTable<any>;
  @ViewChild('filter', {static: false}) filter: ElementRef;

  filterForm: FormGroup = new FormGroup({});
  calendarData: any[] | CalendarModel[];
  subscriptions: Subscription[];
  private role: any;
  dataSource: any;
  calendarDataForMe: any[] | CalendarModel[];

  constructor(private dialog: MatDialog,
              private router: Router,
              // datePipe : DatePipe,
              private authLogin : LoginAuthService,
              private calendarService: CalendarService,
              private formBuilder: FormBuilder,
              ) {
  }

  ngOnInit(): void {
    this.calendarService.getTableInfos().subscribe(x => {
      console.log(x);
      this.calendarService.getMyInfo(parseInt(this.getUser())).subscribe(x => {
        console.log(x)
        this.calendarDataForMe = x;
      });
      this.calendarData = x;
    });

    //this.subscriptions.push(sub);

    // this.filterForm = this.formBuilder.group({
    //   idVacancy: [0],
    // });
    // this.calendarService.list(this.paginator, this.sort, this.filterForm.value).subscribe((response: any) => {
    //   this.calendarTable = new MatTableDataSource<ScheduleComponent>(response);
    //   this.calendarTable.paginator = this.paginator;
    //   this.calendarTable.sort = this.sort;
    //
    // });

  }


  result(element: any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(InterviewResultComponent, {
        panelClass: 'full-width-dialog2', data: {
          element: element
        }
      }
    ).afterClosed().subscribe({
      next: value => {
        if (value) {
          this.ngOnInit();
        }
      }
    })
    this.router.navigate(['hr/schedule'])

  }
  getRole(): string{
    this.role = this.authLogin.getUser(localStorage.getItem('tokenString')).idRole;
    return this.role;
  }
  compareDates(element): boolean {
    //this.ngOnInit();
    //return element.endTime < this.datePipe.transform(new Date(), "yyyy-MM-dd'T'hh:mm");
    return true;
  }
  getUser(): any{
    return this.authLogin.userId();
  }

}
