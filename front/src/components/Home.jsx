import React, { useState, useEffect } from "react";
import Axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const URL = "http://localhost:9090";
const URLcheckUser = URL + "/home";

function Home() {
  const [username, setUsername] = useState("");
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [wrongUsername, setWrongUsername] = useState(false);

  const [password, setPassword] = useState("");
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setEmptyUsername(false);
    setWrongUsername(false);
    setWrongPassword(false);
  }, [username]);

  useEffect(() => {
    setEmptyPassword(false);
    setWrongUsername(false);
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
        console.log(response.data);
        // console.log(response.status, response.data);
        // console.log(response?.data);
        // console.log(response?.accessToken);
        // console.log(JSON.stringify(response));
        console.log(response.status, response.data);
        if (response.status == 200 && response.data.status === true) {
          setEmptyUsername(false);
          setEmptyPassword(false);
          setWrongUsername(false);
          setWrongPassword(false);
          setSuccess(true);
          navigate("/" + username);
          setUsername("");
          setPassword("");
        } else {
          setWrongUsername(true);
          setWrongPassword(true);
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="auth-form-container">
      <h2>Home</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="username"
          placeholder="username"
          id="username"
          name="username"
        ></input>
        <label htmlFor="password">Password:</label>
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
          Wrong username or password.
        </p>
        <p
          id="confirmnote"
          className={emptyUsername ? "instructions" : "offscreen"}
        >
          You didn't fill username.
        </p>
        <p
          id="confirmnote"
          className={emptyPassword ? "instructions" : "offscreen"}
        >
          You didn't fill password.
        </p>
      </form>
      <p className="sign-paragraph">Don't have an account?</p>
      <NavLink className="navlink" to="/register">
        Sign Up
      </NavLink>
    </div>
  );
}

export default Home;
