import * as React from "react";
import { useHttp } from "../hooks/http.hook";
import "../index.css";

const AuthPage = () => {
  const { loading, error, request } = useHttp();
  const [form, setForm] = React.useState({ email: "", password: "" });

  const changeHandler = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setForm({ ...form, [target?.name]: target?.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request(
        "/api/auth/register",
        "POST",
        { ...form },
        Headers
      );
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3 center-align">
        <h3>URL shortener</h3>
        <div className="card grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div className="input-field">
              <input
                placeholder="Enter your E-mail"
                id="email"
                type="text"
                className="validate text-field"
                name="email"
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                placeholder="Enter your password"
                id="password"
                type="password"
                className="validate text-field"
                name="password"
                onChange={changeHandler}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow darken-4 login-button"
              disabled={loading}
            >
              Login
            </button>
            <button
              className="btn grey ligthen-1 black-text"
              disabled={loading}
              onClick={registerHandler}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
