import { noop } from "jquery";
import * as React from "react";

export const AuthContext = React.createContext({
  token: null,
  userId: null,
  login: noop(),
  logout: noop(),
  isAuthentificated: false,
});
