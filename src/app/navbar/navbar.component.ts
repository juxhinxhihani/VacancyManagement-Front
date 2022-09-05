import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {LoginAuthService} from "../services/login-auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sidenavWidth = 4;
  isUserLoggedIn: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private  loginAuth : LoginAuthService) {
  }

  isExpanded: boolean = false;
  role: any;
  ngOnInit(): void {
    this.isUserLoggedIn = -localStorage.getItem("isUserLoggedIn");
  }

  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }

  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }

  refresh(): void {
    window.location.reload();
  }

  logO() {
    this.router.navigate(['/login']);
  }
  getRole(): string{
    this.role = this.loginAuth.getUser(localStorage.getItem('tokenString')).idRole;
    return this.role;
  }
}
