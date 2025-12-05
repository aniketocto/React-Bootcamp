import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Component/Landing";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import EventDetails from "./Component/EventDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/event/:id" element={<EventDetails />} /> {/* ✅ NEW */}
    </Routes>
  );
};

export default App;
