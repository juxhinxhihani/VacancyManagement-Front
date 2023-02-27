import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {BlacklistService} from "../../services/blacklist.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HrTableService} from "../../services/hrTable.service";
import {HrCandidateModel} from "../../models/hrCandidate.model";
import {HttpClient} from "@angular/common/http";
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import { blackListModel } from 'src/app/models/blackList.model';
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.css'],
  viewProviders: [MatExpansionPanel],
})
export class BlacklistComponent implements OnInit {
  tableData: any;

  displayedColumns: string[] = ['CandidateName','CandidateSurname','UserCreated', 'Reason', 'DatetimeCreated'];
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table', {static: false}) table: MatTable<any>;
  @ViewChild('filter', {static: false}) filter: ElementRef;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  newSize = 0;
  newPageSize = 10;
  filterForm: FormGroup = new FormGroup({});
  candidate: HrCandidateModel;
  element: any;
  expandedElement: blackListModel;

  constructor(private router:Router,
              private http : HttpClient,
              private hrService : HrTableService,
              public dialogService: MatDialog,
              private formBuilder: FormBuilder,
              private blService: BlacklistService) { }

  ngOnInit() {

    this.blService.getAll().subscribe((data) => {
      console.log(data)
      this.tableData = data;
    });
    this.filterForm = this.formBuilder.group({
      CandidateName: [""],
    });
    this.blService.list(this.paginator, this.sort, this.filterForm.value).subscribe((response: any) => {
      this.tableData = new MatTableDataSource<BlacklistComponent>(response);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;
    });
  }

  onAdd() {
    this.router.navigate(['blacklist-form'])
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }
}
