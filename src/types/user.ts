// FILE: src/types/user.ts
export enum Role {
    CUSTOMER = 'CUSTOMER',
    ADMIN = 'ADMIN',
    TAILOR = 'TAILOR'
  }
  
  
  export interface User {
    id: string;
    email: string;
    name?: string;
    phoneNumber?: string;
    profilePic?: string;
    emailVerified: boolean;
    verificationToken?: string;
    verificationTokenExpiry?: Date;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  }
  
  
  export interface Order {
    id: string;
    userId: string;
    // Add other order properties as needed
  }
  
  
  export interface Measurement {
    id: string;
    userId: string;
    // Add measurement properties as needed
  }
  
  