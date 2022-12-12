export interface User {
  userId: string;
  email: string | null;
  name: string;
  photoURL: string | null;
  emailVerified?: boolean;
  admin: boolean;
}
