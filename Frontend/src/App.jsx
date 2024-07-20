import React from "react";
import "./App.css";
import Login from "./modules/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./modules/Signup";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
