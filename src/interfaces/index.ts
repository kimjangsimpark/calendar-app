// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id?: string;
  name?: string;
  accessToken?: string;
};

export type LoginData = {
  accessToken: string;
};

export type LoginRequest = {
  accessToken: string;
  success: boolean;
  message: string;
};
