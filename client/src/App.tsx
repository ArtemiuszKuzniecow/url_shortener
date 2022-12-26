import * as React from "react";
import "materialize-css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

function App() {
  const elements = useRoutes(routes(true));
  return <div className="container">{elements}</div>;
}

export default App;
