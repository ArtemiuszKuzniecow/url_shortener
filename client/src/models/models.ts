export interface IAuth {
  token: string | null;
  login(jwtToken?: string, id?: string): void;
  logout(): void;
  userId: string | null;
  isAuthenticated: boolean;
}
