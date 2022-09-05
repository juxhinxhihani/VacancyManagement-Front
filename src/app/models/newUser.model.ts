export class newUserModel {
  constructor(
    public id: number,
    public user: string,
    public name: string,
    public surname: string,
    public email: string,
    public password:  string,
    public idRole: number,
    public isActive: boolean
  ){

  }
}
