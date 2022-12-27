import * as React from "react";
import { IAuth } from "../models/models";

const noop = () => {
  return;
};

export const AuthContext = React.createContext<IAuth>({
  token: null,
  login: noop,
  logout: noop,
  userId: null,
  isAuthenticated: false,
});
