import React from "react";
import "./App.css";
import Login from "./modules/Login";
import { Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
