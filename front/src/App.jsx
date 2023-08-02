import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/jsx/Register";
import Login from "./components/jsx/Login";
import Home from "./components/jsx/Home";
import "./App.css";

function App() {
  const [accessToken, setAccessToken] = useState(false);
  const [refreshToken, setRefreshToken] = useState(false);
  const setTokens = (accessT, refreshT) => {
    setAccessToken(accessT);
    setRefreshToken(refreshT);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Login setTokens={setTokens} />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route
          path="home"
          element={
            <Home accessToken={accessToken} refreshToken={refreshToken} />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
