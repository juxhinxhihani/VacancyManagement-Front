import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpHeaders} from "@angular/common/http";
import {CalendarService} from "../../../services/calendar.service";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InterviewService} from "../../../services/interview.service";

@Component({
  selector: 'app-interview-result',
  templateUrl: './interview-result.component.html',
  styleUrls: ['./interview-result.component.css'],
  providers: [DatePipe]
})
export class InterviewResultComponent implements OnInit {

  constructor(private interviewService : InterviewService,
              private datePipe : DatePipe,
              private snackBar : MatSnackBar,
              @Inject(MAT_DIALOG_DATA) element: { element: any }
  ) {
  }

  ngOnInit(): void {
  }

  resultsForm = new FormGroup({

    idCandidate:new FormControl(0, [Validators.required]),
    idVacancy:new FormControl(0, [Validators.required]),
    idTLParticipant:new FormControl(0, [Validators.required]),
    idHrParticipant:new FormControl(0, [Validators.required]),
    idUserCreated: new FormControl(0, [Validators.required]),
    DatetimeCreated: new FormControl("s", [Validators.required]),
    resultFromTL: new FormControl('', [Validators.required]),
    resultFromHR:new FormControl('', [Validators.required]),
    requestedSalary:new FormControl('', [Validators.required]),
    offeredSalary:new FormControl('', [Validators.required]),
    offerAcceptance:new FormControl(false, [Validators.required]),
    candidateComments:new FormControl('', [Validators.required]),
    interviewDateTime:new FormControl('', [Validators.required]),
    interviewComments: new FormControl('', [Validators.required]),
}

)

  onSubmit() {
    if(this.resultsForm.valid) {
      this.resultsForm.value.datetimeCreated = this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.sss");
      this.interviewService.create(this.resultsForm.value)

    }
    else {
      this.snackBar.open('Invalid Form', 'Close', {
        duration: 3000,
        verticalPosition: "bottom"
      });
    }
  }
}
