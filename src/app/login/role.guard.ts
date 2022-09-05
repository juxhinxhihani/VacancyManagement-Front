import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginAuthService} from "../services/login-auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private loginAuth: LoginAuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private loc : Location) {
  }

  states = this.router.url;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var userRole = this.loginAuth.getUser(localStorage.getItem('tokenString')).idRole;
    if (userRole == route.data['idRole']) {
      console.log(route.data["idRole"])
      return true;
    } else {
      this.loc.back();
      this.snackBar.open(' You are not authorised', 'Close', {
        duration: 600000,
        verticalPosition: "bottom",
      });
      return false;

    }
  }
}
