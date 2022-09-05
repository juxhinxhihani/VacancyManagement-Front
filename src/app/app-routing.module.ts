import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NavbarComponent} from "./navbar/navbar.component";
import {LoginComponent} from "./login/login.component";
import {AddCandidateComponent} from "./humanResource/candidate/cantidateTable/addCandidate/addCandidate.component";
import {CandidateTableComponent} from "./humanResource/candidate/cantidateTable/candidateTable.component";
import {VacancyTableComponent} from "./humanResource/vacancy/vacancyTable/vacancyTable.component";
import {AddVacancyComponent} from "./humanResource/vacancy/vacancyTable/addVacancy/addVacancy.component";
import {Add} from "./admin/user/add/add.component";
import {UserListComponent} from "./admin/user/userList/user-list.component";
import {BlacklistComponent} from "./humanResource/blacklist/blacklist.component";

import {SearchPipe} from "./humanResource/candidate/cantidateTable/filter.pipe";
import {LoginGuard} from "./login/login.guard";
import {
  ValidCandidateComponent
} from "./humanResource/candidate/cantidateTable/valid-candidate/valid-candidate.component";
import {ScheduleFormComponent} from "./humanResource/schedule/scheduleForm/schedule-form.component";
import {ScheduleComponent} from "./humanResource/schedule/schedule.component";
import {RoleGuard} from "./login/role.guard";



const routes: Routes = [
  {path: '', component: LoginComponent },
  {
    path: 'hr', component: NavbarComponent, children: [
      {path: 'schedule', component: ScheduleComponent},
      {path: 'schedule-form', component: ScheduleFormComponent},
      {path: 'candidates', component: CandidateTableComponent},
      {path: 'valid', component: ValidCandidateComponent},
      {path: 'vacancies', component: VacancyTableComponent},
      {path: 'candidates/add', component: AddCandidateComponent},
      {path: 'candidates/add/:id', component: AddCandidateComponent},
      {path: 'vacancies/add/:id', component: AddVacancyComponent},
      {path: 'vacancies/add', component: AddVacancyComponent},
      {path: 'black-list', component: BlacklistComponent},
    ], canActivate: [LoginGuard, RoleGuard] , data: { idRole : '1'}
  },
  {path: 'login', component: LoginComponent},

  {
    path: 'user', component: NavbarComponent, children:[
      {path: 'add', component: Add },
      {path: 'list', component: UserListComponent}
      ],  canActivate: [LoginGuard, RoleGuard], data: { idRole : '3'}
  },
  {path: 'tl', component : NavbarComponent, children: [
      {path: 'candidates', component: CandidateTableComponent},
      {path: 'blacklist', component: BlacklistComponent},
      {path: 'schedule', component: ScheduleComponent}

    ], canActivate: [LoginGuard, RoleGuard], data : {idRole: '2'}
  },

  ];


@NgModule({
    declarations: [
        SearchPipe
    ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
    exports: [RouterModule, SearchPipe],
})
export class AppRoutingModule { }
