import React, { useState } from "react";
import Axios from "axios";

const URL = "http://localhost:9090";
const URLaddUser = URL + "/new-user";

function Register({ onFormSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setfullName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      fullName: fullName,
      username: username,
      password: password,
    };
    Axios.post(URLaddUser, userData).then((response) => {
      console.log(response.status, response.data);
    });
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setfullName(e.target.value)}
          type="name"
          placeholder="full name"
          id="name"
          nme="name"
        ></input>
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
          Register
        </button>
      </form>
      <button className="link-btn" onClick={() => onFormSwitch("login")}>
        Already have an account?<br></br>Login here.
      </button>
    </div>
  );
}

export default Register;
