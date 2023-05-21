import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const URL = "http://localhost:9090";
const URLcheckUser = URL + "/login";

function Login({ onFormSwitch }) {
  const [username, setUsername] = useState("");
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [wrongUsername, setWrongUsername] = useState(false);

  const [password, setPassword] = useState("");
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setEmptyUsername(false);
    setWrongUsername(false);
  }, [username]);

  useEffect(() => {
    setEmptyPassword(false);
    setWrongPassword(false);
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "") {
      setEmptyUsername(true);
      return;
    }
    if (password === "") {
      setEmptyPassword(true);
      return;
    }
    const userData = {
      username: username,
      password: password,
    };
    Axios.post(URLcheckUser, userData)
      .then((response) => {
        console.log(response.status, response.data);
        console.log(response?.data);
        console.log(response?.accessToken);
        console.log(JSON.stringify(response));
        if (response.status == 200) {
          setUsername("");
          setPassword("");
          setEmptyUsername(false);
          setEmptyPassword(false);
          setWrongUsername(false);
          setWrongPassword(false);
          setSuccess(true);
        } else {
          setWrongUsername(true);
          setWrongPassword(true);
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            You have successfully logged in!
            <br />
            <a href="#"></a>
          </p>
        </section>
      ) : (
        <div className="auth-form-container">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  username !== "" && !emptyUsername && !wrongUsername
                    ? "valid"
                    : "hide"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={emptyUsername || wrongUsername ? "invalid" : "hide"}
              />
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="username"
              placeholder="username"
              id="username"
              name="username"
            ></input>
            <label htmlFor="password">
              Password
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  password !== "" && !emptyPassword && !wrongPassword
                    ? "valid"
                    : "hide"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={emptyPassword || wrongPassword ? "invalid" : "hide"}
              />
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            ></input>
            <button className="submit-btn" type="submit">
              Log In
            </button>
            <p
              id="confirmnote"
              className={
                wrongUsername && wrongPassword ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Wrong username or password.
            </p>
            <p
              id="confirmnote"
              className={emptyUsername ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              You didn't fill username.
            </p>
            <p
              id="confirmnote"
              className={emptyPassword ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              You didn't fill password.
            </p>
          </form>

          <button className="link-btn" onClick={() => onFormSwitch("register")}>
            Don't have an account?<br></br>Register here.
          </button>

          <p>
            Don't have an account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="localhost:5173/register">Sign Up</a>
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default Login;
