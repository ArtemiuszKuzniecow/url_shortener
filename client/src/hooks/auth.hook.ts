import * as React from "react";
import constants from "../constants.json";

const useAuth = () => {
  const [token, setToken] = React.useState<null | string>(null);
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
  }, [login]);

  return { login, logout, token, userId };
};

export default useAuth;
