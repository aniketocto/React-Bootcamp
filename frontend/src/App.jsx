import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Component/Landing";
import Login from "./component/Login";
import Signup from "./Component/Signup";   // ⬅️ ADD THIS

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />   {/* ⬅️ NEW ROUTE */}
    </Routes>
  );
};

export default App;
