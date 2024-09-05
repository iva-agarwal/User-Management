// src/types/User.ts

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    zipcode?: string;
  };
  company?: {
    name?: string;
  };
}
