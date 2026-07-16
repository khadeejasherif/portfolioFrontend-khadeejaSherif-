export interface Iservices {
  _id?: string;
  title: string;
  description: string;
  icon?: string; // Class name (e.g., Lucide, FontAwesome) or SVG path
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}
