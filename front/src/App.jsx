import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="home" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
