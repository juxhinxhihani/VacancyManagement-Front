export class TlCandidateModel {
  constructor(
    public CandidateName: string,
    public CandidateSurname: string,
    public CandidateMobile: number,
    public email: string,
    public isValid: boolean
) {}
}
