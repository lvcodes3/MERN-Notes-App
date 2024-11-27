export interface UserInterface {
  _id: string;
  fullname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface RegisterUserInterface {
  fullname: string;
  email: string;
  password: string;
}

export interface LoginUserInterface {
  email: string;
  password: string;
}
