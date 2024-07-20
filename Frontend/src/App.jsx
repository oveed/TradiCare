import React from "react";
import "./App.css";
import Login from "./modules/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./modules/Signup";
import MainContent from "./modules/Conversation/components/Messages";
import Sidebar from "./modules/Conversation/Sidebar";
import MessagesPaneHeader from "./modules/Conversation/components/MessagesHeader";
import Homepage from "./modules/Conversation/Homepage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
