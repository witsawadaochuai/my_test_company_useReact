import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [page, setPage] = useState("login");
  console.log("Current page:", page);

  return (
    <>
      {page === "login" && <Login switchPage={setPage} />}
      {page === "signup" && <Signup switchPage={setPage} />}
      {page === "dashboard" && <Dashboard switchPage={setPage} />}
    </>
  );
}
