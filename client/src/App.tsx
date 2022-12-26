import * as React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import useAuth from "./hooks/auth.hook";
import "materialize-css";

function App() {
  const { token, login, logout, userId } = useAuth();
  const elements = useRoutes(routes(false));
  return <div className="container">{elements}</div>;
}

export default App;
