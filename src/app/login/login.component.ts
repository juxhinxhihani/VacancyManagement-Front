import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LoginAuthService} from "../services/login-auth.service";
import {UserRolesModel} from "../models/userRoles.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;
  responsedata: any;
  data : any;
  private userRole: UserRolesModel;
  hasError: boolean = false;
  private userid: any;
  private isActive: any;

  constructor(private formBuilder: FormBuilder,
              private route: Router,
              private http: HttpClient,
              private loginAuth: LoginAuthService) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  // login(){
  //   this.http.post<any>("https://localhost:7141/api/Auth/login",
  //     {
  //     "email": this.loginForm.value.email,
  //     "password": this.loginForm.value.password
  //   })
  //   .subscribe({
  //     next: res => {
  //       const hr = res.find((a:any) => {
  //         return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password &&
  //           a.idRole === "1" && a.isActive === true;
  //       });
  //       if (hr) {
  //           this.loginForm.reset();
  //           this.router.navigate(['hr/vacancies']);
  //       } else {
  //         alert("Error 😡");
  //         this.router.navigate(['login']);
  //       }
  //     }, error: err =>
  //   {
  //     alert("Error 😡");
  //   }
  // })
  // }

  login() {
    this.loginAuth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(result => {
      if (result != null) {

        this.responsedata = JSON.stringify(result).split(":");
        this.data = this.responsedata[1].replace("}", "");


        localStorage.setItem('tokenString', this.data);
        this.userRole = this.loginAuth.getUser(this.data);
        this.userid = this.loginAuth.userId();
        this.isActive = this.loginAuth.getUser(this.data).isActive;
        console.log(this.isActive)
        if (this.userRole.idRole === '1') {
          this.route.navigate(['/hr/vacancies'])
        } else if (this.userRole.idRole === '2') {
          this.route.navigate(['/tl/candidates'])
        } else if (this.userRole.idRole === '3') {
          this.route.navigate(['/user/list'])
        }
      }
      else{
        alert("Invalid")
      }

    }, err => {
      this.hasError = true;
    })
  }
}
