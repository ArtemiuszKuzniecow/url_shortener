import * as React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import useAuth from "./hooks/auth.hook";
import "materialize-css";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const elements = useRoutes(routes(isAuthenticated));
  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      {isAuthenticated && <Navbar />}
      <div className="container">{elements}</div>
    </AuthContext.Provider>
  );
}

export default App;
