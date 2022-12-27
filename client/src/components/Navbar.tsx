import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const hamburger = require("../assets/Hamburger_icon.svg.png");
  const auth = React.useContext(AuthContext);
  const ref = React.useRef(null);
  const navigate = useNavigate();
  const loguotHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    auth.logout();
    navigate("/");
  };
  ref.current && M.Sidenav.init(ref.current);

  return (
    <>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper grey darken-2">
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <img src={hamburger} width={40} style={{ marginTop: 10 }} />
            </a>
            <span className="brand-logo">URL shortener</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <NavLink to="/create">Create</NavLink>
              </li>
              <li>
                <NavLink to="/links">Links</NavLink>
              </li>
              <li>
                <a href="/" onClick={loguotHandler}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <ul className="sidenav" id="mobile-demo" ref={ref}>
        <li>
          <NavLink to="/create">Create</NavLink>
        </li>
        <li>
          <NavLink to="/links">Links</NavLink>
        </li>
        <li>
          <a href="/" onClick={loguotHandler}>
            Logout
          </a>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
