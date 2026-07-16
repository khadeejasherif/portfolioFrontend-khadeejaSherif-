export interface Icontact {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number | null;
  message: string;
  createdAt?: string;
}