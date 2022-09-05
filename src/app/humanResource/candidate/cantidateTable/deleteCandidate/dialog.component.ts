import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {LoginAuthService} from "../../../../services/login-auth.service";

@Component({
  selector: 'app-deleteCandidate',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  role: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private loginAuth: LoginAuthService) { }

  ngOnInit(): void {
  }
  getRole(): string{
    this.role = this.loginAuth.getUser(localStorage.getItem('tokenString')).idRole;
    return this.role;
  }
}
