export interface IAuth {
  token: string | null;
  login(jwtToken?: string, id?: string): void;
  logout(): void;
  userId: string | null;
  isAuthenticated: boolean;
}

export interface ILink {
  _id: string;
  from: string;
  to: string;
  code: string;
  clicks: string;
  owner: string;
  date: Date;
  __v: string;
}
