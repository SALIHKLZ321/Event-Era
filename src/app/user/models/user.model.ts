export interface registrationForm {
  fname: string | null | undefined;
  lname: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
  password: string | null | undefined;
}
export interface iUser{
  _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    image: string;
}
