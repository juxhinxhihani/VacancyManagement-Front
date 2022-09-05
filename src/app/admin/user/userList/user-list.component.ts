import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {newUserModel} from "../../../models/newUser.model";
import {UserListService} from "../../../services/userList.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-userList',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  id: number = Number();
  element: newUserModel | undefined
  displayedColumns: string[] = ['name', 'surname', 'email', 'user', 'idRole', 'isActive', 'action'];
  tableData: any = [];
  myList: any = {
    "1": "Human Resource",
    "2": "Team Leader",
    "3": "Admin"
  };
  showActive: boolean = false;

  constructor(private router: Router,
              private userListService: UserListService,
              private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.userListService.getAllTable().subscribe((allData) => {
      console.log(allData);
      this.tableData = allData;
    })
  }
   decactive(id:number){
}
}

