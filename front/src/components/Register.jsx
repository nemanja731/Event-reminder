import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const URL = "http://localhost:9090";
const URLgetUsers = URL + "/get-users";
const URLaddUser = URL + "/new-user";

const fullNameRegex = /^[a-zA-Z][a-zA-Z]{2,23}$/;
const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{2,23}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,24}$/;

function Register({ onFormSwitch }) {
  const userRef = useRef();
  const errorRef = useRef();

  const [fullName, setFullName] = useState("");
  const [fullNameValid, setFullNameValid] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [usernameValid, setUsernameValid] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [matchPasswordValid, setMatchPasswordValid] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [submitFail, setSubmitFail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
    setSubmitFail(false);
  }, [fullName, username, password, matchPassword]);

  useEffect(() => {
    const result = fullNameRegex.test(fullName);
    console.log(result);
    console.log(fullName);
    setFullNameValid(result);
  }, [fullName]);

  useEffect(() => {
    const result = usernameRegex.test(username);
    console.log(result);
    console.log(username);
    setUsernameValid(result);
    setUsernameAvailable(true);
  }, [username]);

  useEffect(() => {
    const result = passwordRegex.test(password);
    console.log(result);
    console.log(password);
    setPasswordValid(result);
    const match = password == matchPassword;
    setMatchPasswordValid(match);
  }, [password, matchPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !fullNameValid ||
      !usernameValid ||
      !passwordValid ||
      !matchPasswordValid
    ) {
      setSubmitFail(true);
      return;
    }
    if (
      !fullNameRegex.test(fullName) ||
      !usernameRegex.test(username) ||
      !passwordRegex.test(password)
    ) {
      setErrorMessage("Invalid Entry");
      return;
    }
    const userData = {
      fullName: fullName,
      username: username,
      password: password,
    };
    Axios.post(URLaddUser, userData)
      .then((response) => {
        console.log(response.status, response.data);
        console.log(response?.data);
        console.log(response?.accessToken);
        console.log(JSON.stringify(response));
        setSuccess(true);
        setFullName("");
        setUsername("");
        setPassword("");
        setMatchPassword("");
        setUsernameAvailable(true);
      })
      .catch((error) => {
        if (!error?.response) {
          setErrorMessage("No Server Response");
        } else if (error.response?.status === 409) {
          setUsernameAvailable(false);
          setUsernameValid(false);
        } else {
          setUsernameAvailable(false);
          setUsernameValid(false);
        }
        errorRef.current.focus();
      });
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <div className="auth-form-container">
          <p
            ref={errorRef}
            className={errorMessage ? "errorMessage" : "offscreen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <h2>Register</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="fullName">
              Full Name
              <FontAwesomeIcon
                icon={faCheck}
                className={fullNameValid ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={fullNameValid || !fullName ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              required
              aria-invalid={fullNameValid ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setFullNameFocus(true)}
              onBlur={() => setFullNameFocus(false)}
            />
            <p
              id="uidnote"
              className={
                fullNameFocus && fullName && !fullNameValid
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must contain only letters.
              <br />3 - 24 characters.
            </p>

            <label htmlFor="username">
              Username
              <FontAwesomeIcon
                icon={faCheck}
                className={usernameValid ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={usernameValid || !username ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="username"
              placeholder="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              aria-invalid={usernameValid ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
            />
            <p
              id="uidnote"
              className={
                usernameFocus && username && !usernameValid
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must begin with a letter.
              <br />3 - 24 characters.
            </p>

            <p
              id="uidnote"
              className={
                !usernameAvailable && !usernameFocus
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Username is not available.
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={passwordValid ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={passwordValid || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={passwordValid ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                passwordFocus && password && !passwordValid
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              At least 1 uppercase, 1 lowercase,
              <br /> 1 number and 1 special character.
              <br /> 8 - 24 characters.
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  matchPasswordValid && matchPassword ? "valid" : "hide"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  matchPasswordValid || !matchPassword ? "hide" : "invalid"
                }
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              placeholder="********"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
              aria-invalid={matchPasswordValid ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchPasswordFocus(true)}
              onBlur={() => setMatchPasswordFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchPasswordFocus && !matchPasswordValid
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button className="submit-btn" type="submit">
              Sign Up
            </button>

            <p
              id="confirmnote"
              className={submitFail ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Please fill in the fields correctly.
            </p>
          </form>
          <button className="link-btn" onClick={() => onFormSwitch("login")}>
            Already have an account?<br></br>Login here.
          </button>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign In</a>
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default Register;

// Axios.post(URLaddUser, userData).then((response) => {
//   console.log(response.status, response.data);
// });

// Axios.get(URLgetUsers)
//   .then((response) => console.log("Response", response))
//   .catch((error) => console.log("Error", error));
// }
