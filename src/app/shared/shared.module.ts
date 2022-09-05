import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ScheduleModule} from "@syncfusion/ej2-angular-schedule";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from '@angular/cdk/table';
import {BrowserModule} from "@angular/platform-browser";
@NgModule({
  declarations: [
  ],
  imports: [

  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ScheduleModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    CdkTableModule,
    BrowserModule
  ]
})
export class SharedModule {
}

