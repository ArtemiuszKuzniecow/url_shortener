import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import useMessage from "../hooks/message.hook";
import "../index.css";

const AuthPage = () => {
  const auth = React.useContext(AuthContext);
  const message = useMessage();
  const navigate = useNavigate();
  const { loading, error, request, cleanError } = useHttp();
  const [form, setForm] = React.useState({ name: "", email: "", password: "" });
  const [isLogin, setIsLogin] = React.useState(true);

  React.useEffect(() => {
    if (error) {
      message(error);
    }
    cleanError();
  }, [error, message, cleanError]);

  React.useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setForm({ ...form, [target?.name]: target?.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request(
        "/api/auth/login",
        "POST",
        { email: form.email, password: form.password },
        Headers
      );
      auth.login(data.token, data.userId);
    } catch (error) {}
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
      loginHandler();
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
                  value={form?.name}
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
                value={form?.email}
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
                value={form?.password}
                onChange={changeHandler}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>

          <div className="card-action">
            {isLogin && (
              <div className="center-align">
                <button
                  className="btn yellow darken-4"
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
                    className="link"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            )}
            {!isLogin && (
              <div className="container">
                <button
                  className="btn grey ligthen-1 black-text"
                  disabled={loading}
                  onClick={registerHandler}
                >
                  Sign Up
                </button>
                <br />
                <p className="white-text">
                  If you have an account you can{" "}
                  <a
                    href="#"
                    onClick={() => setIsLogin((prevState) => !prevState)}
                    className="link"
                  >
                    LOGIN
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
