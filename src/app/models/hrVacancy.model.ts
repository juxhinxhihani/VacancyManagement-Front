export class HrVacancyModel {
  constructor(
    public idVacancy: number,
    public vacancy1:string,
    public description:string,
    public isActive:boolean,
    public dateCreated:Date,
    public dateSaved:Date,
    public idUserCreated: number,
    public idUserSaved: number,
    public idTeamLead: number,
  ) {
  }
}
