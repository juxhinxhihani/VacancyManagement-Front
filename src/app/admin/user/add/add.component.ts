import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class Add implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  formChanged(): void {
    this.selected = parseInt(this.selected);
  }

  ngOnInit(): void {
  }

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z]+")]),
    surname: new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z]+")]),
    user: new FormControl('', [Validators.required, Validators.pattern("(ala[a-z]{4})")]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^(00355|\\+355|0)[0-9]{9}$")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^([a-z]+\\.[a-z]+@raiffeisen\\.al)$")]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]),
    idRole: new FormControl(0, [Validators.required]),
    isActive: new FormControl(false, [Validators.required])
  })
  selected: any;

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userForm.value.isActive = true;
      this.http.post<any>("https://localhost:7141/api/Auth/register", this.userForm.value).subscribe({
        next:
          res => {
            this.userForm.reset();
            this.router.navigate(['user/list']);
          }, error:
          err => {
            alert("Registration not succesful")
          }
      })
    }


  }

}
