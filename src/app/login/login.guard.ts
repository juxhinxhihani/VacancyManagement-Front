import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginAuthService} from "../services/login-auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private loginAuth : LoginAuthService,
              private _snackBar : MatSnackBar,
              private route : Router) {
  }
  canActivate(){
  if(this.loginAuth.isLoggedIn()){
    return true;
  }
  else{
    this.route.navigate(['/login']);
    this._snackBar.open(' Login First', 'Close', {
      duration: 3000,
      verticalPosition: "bottom",
    });
    return false;
  }
  }

}
