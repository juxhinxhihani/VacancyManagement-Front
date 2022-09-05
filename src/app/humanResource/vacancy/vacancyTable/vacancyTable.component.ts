import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {VacanciesTableService} from "../../../services/vacanciesTable.service";
import {HrCandidateModel} from "../../../models/hrCandidate.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HrVacancyModel} from "../../../models/hrVacancy.model";
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";

@Component({
  selector: 'app-hr-add-new-humanResource',
  templateUrl: './vacancyTable.component.html',
  styleUrls: ['./vacancyTable.component.css'],
  viewProviders: [MatExpansionPanel],
  //expanded rows animation
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VacancyTableComponent implements OnInit {
  displayedColumns: string[] = ['VacancyName', 'VacancyDescription', 'action'];
  tableData: any = [];
  filterForm: FormGroup = new FormGroup({});
  newSize = 0;
  newPageSize = 10;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table', {static: false}) table: MatTable<any>;
  @ViewChild('filter', {static: false}) filter: ElementRef;
  // test
  @ViewChild(MatAccordion) accordion: MatAccordion;
  isDisabled = false;
  role: string;
  // expanded rows
  expandedElement: HrVacancyModel;
  element: any;

  constructor(private router: Router,
              private http : HttpClient,
              private hrServiceT: VacanciesTableService,
              private _snackBar: MatSnackBar,
              private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.hrServiceT.getAllTable().subscribe((allData) => {
      this.tableData = allData;
      console.log(this.tableData)
    });
    this.filterForm = this.formBuilder.group({
      CandidateName: [""],
    });
    this.hrServiceT.list(this.paginator, this.sort, this.filterForm.value).subscribe((response: any) => {
      this.tableData = new MatTableDataSource<VacancyTableComponent>(response);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;
    });
  }

  onAdd() {
    this.router.navigate(['hr/vacancies/add'])
  }

  update(element: HrCandidateModel) {
    this.router.navigate(['hr/vacancies/add/' + element])
  }

  deleteTable(idV: number){
    console.log(idV)
    this.hrServiceT.openConfirmDialog('Are you sure you want to delete it?')
      .afterClosed().subscribe((res => {
      if (res) {
        this.hrServiceT.deleteTable(idV).subscribe((result) => {
          console.log(result);
          this.ngOnInit();
        });
      }
    }))
    this.router.navigate(['hr/vacancies'])
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }
}
