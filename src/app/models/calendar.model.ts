export class CalendarModel {
  constructor(
    public id_Schedule: number,
    public id_User: number,
    public id_Candidate: number,
    public id_Vacancy: number,
    public start_Time: Date,
    public end_Time: Date
  ) {
  }

}
