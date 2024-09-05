// src/types/User.ts

export interface Address {
  street: string;
  city: string;
  zipcode: string;
  suite?: string; // Mark as optional if it's not always present
}

export interface Company {
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website?: string; // Add this property
  address?: Address;
  company?: Company;
}
