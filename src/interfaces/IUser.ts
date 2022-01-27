export default interface IUser {
  id: number;
  userImage: string;
  token: string;
  pseudo: string;
  admin: number;
  userIn: boolean;
}
export default interface IUserLog {
  id_user: number;
  lastname: string;
  firstname: string;
  adress: string;
  zipcode: number;
  city: string;
  email: string;
  password: string;
  hash_password: string;
  picture: string;
  isadmin: number;
  isarchived: number;
  id_gender: number;
  id_country: number;
  adress_complement: string;
  id_athletic: number;
  birthday: string;
  country: string;
  phone: string;
  creation_date: string;
  pseudo: string;
  authentified_by_facebook: number;
  is_professional: number;
}
