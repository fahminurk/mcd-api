export interface User {
  _id: string;
  email: string;
  fullname: string;
  password: string;
}

export interface Register {
  email: string;
  fullname: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}
