export class HrCandidateModel {
  constructor(
    public id: number,
    public candidateName: string,
    public candidateSurname: string,
    public candidateMobile: string,
    public candidateEmail: string,
    public candidateCv:  string,
    public id_Vacancy1: number,
    public dateCreated : Date,
    public dateSaved : Date,
    public idUserCreated: number,
    public idUserLastSaved : number,
  ) {
  }
}
