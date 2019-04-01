export class User {
  // tslint:disable-next-line: variable-name
  _id: string;
  unitNum: string;
  fullName: string;
  email: string;
  password: string;
}
export interface LoginRsp {
  success: boolean;
  token: string;
}
export interface SignupRsp {
  success: boolean;
  message: string;
}
