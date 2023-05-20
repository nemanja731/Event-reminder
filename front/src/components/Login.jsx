import React, { useState } from "react";
import Axios from "axios";

const URL = "http://localhost:9090";
const URLgetUsers = URL + "/get-users";
const URLcheckUser = URL + "/login";

function Login({ onFormSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.get(URLgetUsers)
      .then((response) => console.log("Response", response))
      .catch((error) => console.log("Error", error));

    // axios
    //   .post(URLaddUser, JSON.stringify(data), {
    //     headers: { Authorization: token },
    //   })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="username"
          placeholder="username"
          id="username"
          name="username"
        ></input>
        <label htmlFor="password">Password</label>
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
      </form>

      <button className="link-btn" onClick={() => onFormSwitch("register")}>
        Don't have an account?<br></br>Register here.
      </button>
    </div>
  );
}

export default Login;
