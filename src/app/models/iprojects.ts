export interface Iprojects {
  _id?: string;
 title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  order: number;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
