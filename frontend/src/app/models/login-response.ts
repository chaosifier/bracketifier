export interface LoginResponseModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  jwtToken: string;
}

export interface StandardResponseModel<T = undefined> {
  success: boolean;
  data: T;
  message: string;
}
