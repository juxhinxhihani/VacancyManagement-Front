import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { PdfViewerModule} from "ng2-pdf-viewer";
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { CartPageComponent } from './home/cartPages/cart-page.component';
import { AddCandidateComponent } from './humanResource/candidate/cantidateTable/addCandidate/addCandidate.component';
import { CandidateTableComponent } from './humanResource/candidate/cantidateTable/candidateTable.component';
import { DialogComponent } from './humanResource/candidate/cantidateTable/deleteCandidate/dialog.component';
import { VacancyTableComponent } from './humanResource/vacancy/vacancyTable/vacancyTable.component';
import { AddVacancyComponent } from './humanResource/vacancy/vacancyTable/addVacancy/addVacancy.component';
import { BlacklistComponent } from './humanResource/blacklist/blacklist.component';
import {SharedModule} from "./shared/shared.module";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Add} from "./admin/user/add/add.component";
import {UserListComponent} from "./admin/user/userList/user-list.component";
import {AngularMaterialModule} from "./shared/angular-material.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormsModule} from "@angular/forms";
import { MoveBlacklistComponent } from './teamLeader/candidate/move-blacklist/move-blacklist.component';
import {InfoComponent} from "./humanResource/candidate/cantidateTable/info/info.component";
import {ValidCandidateComponent } from "./humanResource/candidate/cantidateTable/valid-candidate/valid-candidate.component";
import { ScheduleFormComponent } from './humanResource/schedule/scheduleForm/schedule-form.component';

import {MatDatepickerModule} from "@angular/material/datepicker";
import {CurrencyPipe, DatePipe} from '@angular/common';
import { InterviewResultComponent } from './humanResource/schedule/interview-result/interview-result.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ScheduleComponent } from './humanResource/schedule/schedule.component';
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppComponent,
    HomeComponent,
    LoginComponent,
    CartPageComponent,
    AddCandidateComponent,
    CandidateTableComponent,
    DialogComponent,
    VacancyTableComponent,
    AddVacancyComponent,
    BlacklistComponent,
    Add,
    UserListComponent,
    InfoComponent,
    ValidCandidateComponent,
    MoveBlacklistComponent,
    ScheduleFormComponent,
    InterviewResultComponent,
    ScheduleComponent
  ],
  entryComponents: [
    MoveBlacklistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AngularMaterialModule,
    PdfViewerModule,
    MatTooltipModule,
    FormsModule,
    MatDatepickerModule,
    MatRadioModule,
    MatGridListModule,
    MatCheckboxModule,
    MatExpansionModule,
  ],
  exports:[SharedModule,],
  providers: [MatSnackBar, MatDatepickerModule,DatePipe, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule{}
