import{HrCandidateModel} from "./hrCandidate.model";

export class blackListModel {
  constructor(
    public id: number,
    public idBlackListCandidate: HrCandidateModel[],
    public Reason: string,
    public DatetimeCreated: Date
  ) {
  }
}
