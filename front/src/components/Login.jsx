import React, { useState } from "react";
import Axios from "axios";

const URL = "http://localhost:9090";
const URLgetUsers = URL + "/get-users";
const URLaddUser = URL + "/new-user";

function Login({ onFormSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    Axios.get("https://jsonplaceholder.typicode.com/posts")
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
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email@gmail.com"
          id="email"
          name="email"
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
