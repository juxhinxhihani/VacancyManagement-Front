export class ValidModel {
  constructor(
    public id: number,
    public idVacancy: number,
    public idCandidate: number,
    public isValid: boolean,
    public dateCreated : Date

  ) {
  }
}
