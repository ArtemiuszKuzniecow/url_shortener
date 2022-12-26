import * as React from "react";
import { useHttp } from "../hooks/http.hook";
import useMessage from "../hooks/message.hook";
import "../index.css";

const AuthPage = () => {
  const message = useMessage();
  const { loading, error, request, cleanError } = useHttp();
  const [form, setForm] = React.useState({ name: "", email: "", password: "" });
  const [isLogin, setIsLogin] = React.useState(true);

  React.useEffect(() => {
    if (error) {
      message(error);
    }
    cleanError();
  }, [error, message, cleanError]);

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
      message(data.message);
    } catch (error) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request(
        "/api/auth/login",
        "POST",
        { email: form.email, password: form.password },
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
            {!isLogin && (
              <div className="input-field">
                <input
                  id="name"
                  type="text"
                  className="validate text-field"
                  name="name"
                  onChange={changeHandler}
                />
                <label htmlFor="name">Name</label>
              </div>
            )}
            <div className="input-field">
              <input
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
            {isLogin && (
              <>
                <button
                  className="btn yellow darken-4 login-button"
                  disabled={loading}
                  onClick={loginHandler}
                >
                  Login
                </button>
                <p className="white-text">
                  Do not have an account? <br />
                  <a
                    href="#"
                    onClick={() => setIsLogin((prevState) => !prevState)}
                  >
                    Sign Up
                  </a>
                </p>
              </>
            )}
            {!isLogin && (
              <button
                className="btn grey ligthen-1 black-text"
                disabled={loading}
                onClick={registerHandler}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
