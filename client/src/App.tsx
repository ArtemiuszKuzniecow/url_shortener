import * as React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import useAuth from "./hooks/auth.hook";
import "materialize-css";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader/Loader";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const elements = useRoutes(routes(isAuthenticated));

  if (!ready) {
    return <Loader />;
  }
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
