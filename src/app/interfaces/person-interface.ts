export interface Person {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  position?: string;
  department?: string;
  hireDate?: Date | string;
  salary?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}