export class InterviewModel {
  constructor(
    public idInterview: number,
    public idVacancy: number,
    public idCandidate: number,
    public idTLParticipant: number,
    public idHrParticipant: number,
    public idUserCreated: number,
    public DatetimeCreated: Date,
    public resultFromTL: number,
    public resultFromHR: number,
    public requestedSalary: number,
    public offeredSalary: number,
    public offerAcceptance: boolean,
    public candidateComments: string,
    public interviewDateTime: Date,
    public interviewComments: string,
  ) {
  }
}

