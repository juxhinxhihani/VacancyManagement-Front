import {Component, Inject, OnInit} from '@angular/core';
import {HrTableService} from "../../../../services/hrTable.service";
import {HrCandidateModel} from "../../../../models/hrCandidate.model";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoginAuthService} from "../../../../services/login-auth.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  hrTable: HrCandidateModel[];
  private role: any;

  constructor(private hrService : HrTableService,
              private loginAuth : LoginAuthService,
              @Inject(MAT_DIALOG_DATA) public data: {element: any}) {

  }
  getRole(): string{
    this.role = this.loginAuth.getUser(localStorage.getItem('tokenString')).idRole;
    return this.role;
  }

  ngOnInit(): void {
  }
}
