import * as React from "react";
import constants from "../constants.json";

const useAuth = () => {
  const [token, setToken] = React.useState<null | string>(null);
  const [ready, setReady] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<null | string>(null);

  const login = React.useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(userId);

    localStorage.setItem(
      constants.token,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = React.useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(constants.token);
  }, []);

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem(constants.token) || "{}");

    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};

export default useAuth;
