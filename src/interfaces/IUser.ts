export default interface IUser {
  id_user: number;
  lastname: string;
  firstname: string;
  address: string;
  zipcode: number;
  city: string;
  email: string;
  password: string;
  hash_password: string;
  picture: string;
  is_admin: number;
  is_archived: number;
  id_gender: number;
  id_country: number;
  address_complement: string;
  id_athletic: number;
  birthday: string;
  country: string;
  phone: string;
  creation_date: string;
  pseudo: string;
  authentified_by_facebook: number;
  is_professional: number;
}
