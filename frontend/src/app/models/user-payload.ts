export interface UserPayload {
  name?: UserName;
  email: string;
  password: string;
}

export interface UserName {
  first: string;
  last: string;
}
